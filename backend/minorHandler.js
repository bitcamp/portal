const AWS = require("aws-sdk");
const withSentry = require("serverless-sentry-lib");

AWS.config.update({ region: "us-east-1" });

const HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Credentials": true,
  "Access-Control-Allow-Headers": "*",
};

const withSentryOptions = {
  captureErrors: true,
  captureUnhandledRejections: true,
  captureUncaughtException: true,
  captureMemory: true,
  captureTimeouts: true,
};

module.exports.registerMinor = withSentry(withSentryOptions, async (event) => {
  const body = JSON.parse(event.body);
  const ddb = new AWS.DynamoDB.DocumentClient();

  if (!body.email || !body.name || !body.phone || !body.school_year) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing required fields" }),
      headers: HEADERS,
    };
  }

  const existingReg = await ddb
    .get({
      TableName: process.env.MINOR_TABLE,
      Key: { email: body.email.toLowerCase() },
    })
    .promise();

  let referralID;
  if (existingReg.Item != null) {
    referralID = existingReg.Item.referral_id;
  } else {
    const referralBase = body.name.split(" ")[0].toLowerCase();
    referralID = referralBase + "-" + makeAddon(3);
  }

  const params = {
    TableName: process.env.MINOR_TABLE,
    Item: {
      timestamp: new Date().toISOString(),
      email: body.email.toLowerCase(),
      referral_id: referralID,

      name: body.name,
      first_name: body.first_name,
      last_name: body.last_name,
      age: body.age,
      phone: body.phone,
      gender: body.gender,
      country_of_residence: body.country_of_residence,
      ethnicity: body.ethnicity,

      school: body.school,
      school_other: body.school_other,
      school_year: body.school_year,
      major: body.major,

      recruit: body.recruit,
      portfolio: body.portfolio,
      resume_link: body.resume_link,
      resume_id: body.resume_id,
      citizen: body.citizen,

      track: body.track_selected,
      track_waitlist: body.waitlist_track_selected,
      quantum_track: body.quantum_track,
      beginner_content_opt_in: body.beginner_content_opt_in,

      transport_assistance: body.transport,

      address1: body.address1,
      address2: body.address2,
      city: body.city,
      state: body.state,
      zip: body.zip,
      country: body.country,

      tshirt_size: body.tshirt_size,
      hack_count: body.hack_count,
      question1: body.question1,
      question2: body.question2,
      heard_from: body.heard_from,
      dietary_restrictions: body.dietary_restrictions,

      survey_green: body.green,
      survey_red: body.red,
      survey_blue: body.blue,

      MLH_privacy: body.MLH_privacy,
      MLH_conduct: body.MLH_conduct,
      MLH_emails: body.MLH_emails,
      minors_form: body.minors_form,

      referred_by: body.referred_by,
      // waitlist: body.waitlist,

      waiver_type: body.waiverType,

      photo_name: body.photo_name,
      photo_date: body.photo_date,
      photo_signature: body.photo_signature,

      p_photo_name: body.p_photo_name,
      p_photo_date: body.p_photo_date,
      p_photo_signature: body.p_photo_signature,

      terms_minor_name: body.terms_minor_name,
      terms_minor_date: body.terms_minor_date,
      terms_minor_signature: body.terms_minor_signature,

      terms_parent_name: body.terms_parent_name,
      terms_parent_date: body.terms_parent_date,
      terms_parent_signature: body.terms_parent_signature,

      chap_name: body.chap_name,
      chap_date: body.chap_date,
      chap_signature: body.chap_signature,
      p_chap_name: body.p_chap_name,
      p_chap_date: body.p_chap_date,
      p_chap_signature: body.p_chap_signature,

      school_minor_name: body.school_minor_name,
      school_minor_date: body.school_minor_date,
      school_minor_signature: body.school_minor_signature,
      school_teacher_name: body.school_teacher_name,
      school_teacher_date: body.school_teacher_date,
      school_teacher_signature: body.school_teacher_signature,
      school_principal_name: body.school_principal_name,
      school_principal_date: body.school_principal_date,
      school_principal_signature: body.school_principal_signature,
    },
  };

  if (existingReg.Item != null && existingReg.Item.referred_by) {
    params.Item.referred_by = existingReg.Item.referred_by;
  }
  if (existingReg.Item != null && existingReg.Item.referral_count) {
    params.Item.referral_count = existingReg.Item.referral_count;
  }

  if (body.referred_by) {
    try {
      const referred_by = normalizeReferral(body.referred_by);
      params.Item.referred_by = referred_by;
      body.referred_by = referred_by;

      await Promise.all([
        logStatistic(ddb, "referrals", 1),
        logReferral(ddb, body.referred_by, body.name),
      ]);
    } catch (error) {
      console.error("Failed to log referral!");
      console.error(error);
    }
  }

  const logWaitlistTrack = () => {
    if (body.waitlist_track_selected.length > 0) {
      logStatistic(ddb, "track-waitlist-" + body.waitlist_track_selected, 1);
    }
  };

  await Promise.all([
    logStatistic(ddb, "track-" + body.track_selected, 1),
    logWaitlistTrack(),
    logStatistic(ddb, "registrations", 1),
    // Call DynamoDB to add the item to the table
    ddb.put(params).promise(),
    // Send confirmation email
    sendConfirmationEmail(params.Item),
    registerTeamMatching(ddb, body),
  ]);

  // Returns status code 200 and JSON string of 'result'
  return {
    statusCode: 200,
    body: JSON.stringify(params.Item),
    headers: HEADERS,
  };
});

// makeAddon generates a random string of `length`
const makeAddon = (length) => {
  var result = [];
  var chars = "abcdefghjkmnpqrstuvwxyz23456789"; // avoid i, l , o, 0, 1
  for (var i = 0; i < length; i++) {
    result.push(chars.charAt(Math.floor(Math.random() * chars.length)));
  }
  return result.join("");
};

const logStatistic = (ddb, stat) => {
  return ddb
    .update({
      TableName: process.env.STATISTICS_TABLE,
      Key: { statistic: stat },
      ReturnValues: "NONE",
      UpdateExpression: "add #key :value",
      ExpressionAttributeNames: { "#key": "value" },
      ExpressionAttributeValues: { ":value": 1 },
    })
    .promise();
};

const normalizeReferral = (referred_by) => {
  const givenChunks = referred_by.split("-");
  return givenChunks[0] + "-" + givenChunks[1].substring(0, 3);
};

const logReferral = async (ddb, referred_by, referralName) => {
  var referralQuery = {
    TableName: process.env.REGISTRATION_TABLE,
    IndexName: "referralsIndex",
    KeyConditionExpression: "referral_id = :v_refer",
    ExpressionAttributeValues: { ":v_refer": referred_by },
  };
  const resp = await ddb.query(referralQuery).promise();

  if (resp.Items && resp.Items.length > 0) {
    return ddb
      .update({
        TableName: process.env.REGISTRATION_TABLE,
        Key: { email: resp.Items[0].email },
        ReturnValues: "NONE",
        UpdateExpression: "add #key :value",
        ExpressionAttributeNames: { "#key": "referral_count" },
        ExpressionAttributeValues: { ":value": 1 },
      })
      .promise();
  }
  return Promise.resolve();
};

// registerTeamMatching adds team matching data to a DynamoDB Table
const registerTeamMatching = async (ddb, body) => {
  if (!(body.opt_in_team_matching === "yes")) {
    return;
  }

  var params = {
    TableName: process.env.TEAM_MATCHING_TABLE,
    Item: {
      email: body.email,
      collab: body.collab,
      experience: body.experience,
      first_name: body.first_name,
      languages: body.languages,
      last_name: body.last_name,
      num_team_members: body.num_team_members,
      prizes: body.prizes,
      projects: body.projects,
      serious: body.serious,
      skill_level: body.skill_level,
      skills_wanted: body.skills_wanted,
      track: body.track,
      year: body.school_year,
    },
  };

  await ddb.put(params).promise();
};

// sendConfirmationEmail uses AWS SES to send a confirmation email to the user
const sendConfirmationEmail = async (user) => {
  const ses = new AWS.SES();

  const reregisterLink = "https://register.bit.camp?redo=" + user.email;

  // Capitalize track
  const track = user.track
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const school_year_options = [
    {
      value: "less than high school",
      text: "Less than Secondary / High School",
    },
    { value: "high school", text: "Secondary / High School" },
    {
      value: "undergrad 2 year",
      text: "Undergraduate University (2 year - community college or similar)",
    },
    { value: "undergrad 3+ year", text: "Undergraduate University (3+ year)" },
    {
      value: "grad",
      text: "Graduate University (Masters, Professional, Doctoral, etc)",
    },
    { value: "bootcamp", text: "Code School / Bootcamp" },
    {
      value: "vocational",
      text: "Other Vocational / Trade Program or Apprenticeship",
    },
    { value: "postdoc", text: "Post Doctorate" },
    { value: "other", text: "Other" },
    { value: "not a student", text: "I'm not currently a student" },
    { value: "prefer not to answer", text: "Prefer not to answer" },
  ];

  const schoolYear = school_year_options.find(
    (option) => option.value === user.school_year,
  ).text;

  const tShirtSize = user.tshirt_size.toUpperCase();

  // Combine address fields
  const address = [
    user.address1,
    user.address2,
    user.city,
    user.state,
    user.zip,
    user.country,
  ]
    .filter(Boolean) // Remove empty/null values
    .join(", ");

  const params = {
    Destination: { ToAddresses: [user.email] },
    Source: "Bitcamp <hello@bit.camp>",
    ConfigurationSetName: "registration-2024",
    Template: "DetailedHackerRegistrationConfirmation",
    TemplateData: `{\"firstName\":\"${user.first_name}\",\"reregisterLink\":\"${reregisterLink}\",\"email\":\"${user.email}\",\"name\":\"${user.name}\",\"age\":\"${user.age}\",\"track\":\"${track}\",\"phone\":\"${user.phone}\",\"school_type\":\"${schoolYear}\",\"school\":\"${user.school}\",\"address\":\"${address}\",\"tshirt_size\":\"${tShirtSize}\"}`,
  };

  return await ses.sendTemplatedEmail(params).promise();
};
