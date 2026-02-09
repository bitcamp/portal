const AWS = require("aws-sdk");
const UUID = require("uuid");
const withSentry = require("serverless-sentry-lib");

AWS.config.update({ region: "us-east-1" });

const WAITLIST_ENABLED = false;

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
    do {
      referralID = referralBase + "-" + makeAddon(3);
      var referralQuery = {
        TableName: process.env.MINOR_TABLE,
        IndexName: "referralsIndex",
        KeyConditionExpression: "referral_id = :v_refer",
        ExpressionAttributeValues: { ":v_refer": referralID },
      };
      var resp = await ddb.query(referralQuery).promise();
    } while (resp.Count != 0);
  }



  var params = {
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
      waitlist: WAITLIST_ENABLED,

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

  const logTeamMatchingOptIn = () => {
    if (body.opt_in_team_matching === "yes") {
      return logStatistic(ddb, "team-matching-opt-in", 1);
    }
  };

  await Promise.all([
    logStatistic(ddb, "track-" + body.track_selected, 1),
    logWaitlistTrack(),
    logStatistic(ddb, "registrations", 1),
    logStatistic(ddb, "minor-registrations", 1),
    logTeamMatchingOptIn(),
    ddb.put(params).promise(),
    sendConfirmationEmail(params.Item),
    registerTeamMatching(ddb, body),
  ]);


  return {
    statusCode: 200,
    body: JSON.stringify(params.Item),
    headers: HEADERS,
  };
});


const makeAddon = (length) => {
  var result = [];
  var chars = "abcdefghjkmnpqrstuvwxyz23456789";
  for (var i = 0; i < length; i++) {
    result.push(chars.charAt(Math.floor(Math.random() * chars.length)));
  }
  return result.join("");
};

const registerTeamMatching = async (ddb, body) => {
  if (!(body.opt_in_team_matching === "yes")) {
    return;
  }


  const mergeWithOther = (main, other) => {
    const mainArr = Array.isArray(main) ? main : (main ? [main] : []);
    const otherArr = Array.isArray(other) ? other : [];

    const combined = [...mainArr, ...otherArr].filter(item => item !== 'other');
    return Array.from(new Set(combined));
  };

  const mergedLanguages = mergeWithOther(body.languages, body.languages_other);
  const mergedSkillsWanted = mergeWithOther(body.skills_wanted, body.skills_wanted_other);

  var params = {
    TableName: process.env.TEAM_MATCHING_TABLE,
    Item: {
      email: body.email,
      collab: body.collab,
      experience: body.experience,
      first_name: body.first_name,
      languages: mergedLanguages,
      last_name: body.last_name,
      num_team_members: body.num_team_members,
      prizes: body.prizes,
      projects: body.projects,
      serious: body.serious,
      skill_level: body.skill_level,
      skills_wanted: mergedSkillsWanted,
      track: body.track,
      year: body.school_year,
    },
  };

  await ddb.put(params).promise();
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


const sendConfirmationEmail = async (user) => {
  const ses = new AWS.SES();

  const reregisterLink = "https://register.bit.camp?redo=" + user.email;


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


  const address = [
    user.address1,
    user.address2,
    user.city,
    user.state,
    user.zip,
    user.country,
  ]
    .filter(Boolean)
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

const sendReferralNotificationEmail = async (
  fullName,
  email,
  referralID,
  referralName,
) => {
  const ses = new AWS.SES();

  const referralLink = "https://register.gotechnica.org/" + referralID;
  const firstName = fullName.split(" ")[0];

  const params = {
    Destination: { ToAddresses: [email] },
    Source: "Technica <hello@gotechnica.org>",
    ConfigurationSetName: "registration-2021",
    Template: "ReferralNotificationEmail3",
    TemplateData: `{\"firstName\":\"${firstName}\",\"referralLink\":\"${referralLink}\",\"ReferralName\":\"${referralName}\",\"email\":\"${email}\"}`,
  };

  return await ses.sendTemplatedEmail(params).promise();
};




module.exports.upload_resume = withSentry(async (event) => {
  const body = JSON.parse(event.body);

  if (!body.filename) {
    return {
      statusCode: 500,
      body: "/upload_resume is missing filename",
    };
  }

  const s3 = new AWS.S3();

  const folder = UUID.v4();
  const filePath = `${folder}/${body.filename}`;

  const params = {
    Bucket: "bitcamp-2026-resumes",
    Key: filePath,
    Expires: 600,
    ContentType: "multipart/form-data",
  };

  const s3Result = s3.getSignedUrl("putObject", params);

  return {
    statusCode: 200,
    body: JSON.stringify({
      putUrl: s3Result,
      uploadUrl: `https://bitcamp-2026-resumes.s3.amazonaws.com/${filePath}`,
    }),
    headers: HEADERS,
  };
});


module.exports.upload_resume_text = withSentry(async (event) => {
  const body = JSON.parse(event.body);

  if (!body.user_id || !body.resume_text) {
    return {
      statusCode: 500,
      body: "/upload_resume_text is missing user_id or resume_text",
    };
  }

  const ddb = new AWS.DynamoDB.DocumentClient();
  const params = {
    TableName: process.env.RESUMES_TABLE,
    Item: {
      id: body.user_id,
      submitted: new Date().getTime(),
      resume_text: body.resume_text,
    },
  };

  await ddb.put(params).promise();

  return {
    statusCode: 200,
    body: "success",
    headers: HEADERS,
  };
});


module.exports.track = withSentry(async (event) => {
  const body = JSON.parse(event.body);
  const ddb = new AWS.DynamoDB.DocumentClient();

  if (!body.key) {
    return {
      statusCode: 500,
      body: "/track is missing a field",
      headers: HEADERS,
    };
  }


  if (body.key.startsWith("hf")) {
    body.value = event.requestContext.identity.sourceIp;
    await logStatistic(ddb, body.key, 1);
  }


  if (body.key === "open-registration") {
    body.value = event.requestContext.identity.sourceIp;
    await logStatistic(ddb, "page-view", 1);
  }


  if (body.random_id) {
    await ddb
      .update({
        TableName: process.env.TRACKING_TABLE,
        Key: { random_id: body.random_id },
        ReturnValues: "ALL_NEW",
        UpdateExpression: "set #key = :value",
        ExpressionAttributeNames: { "#key": body.key },
        ExpressionAttributeValues: { ":value": body.value },
      })
      .promise();
  }


  return {
    statusCode: 200,
    headers: HEADERS,
  };
});