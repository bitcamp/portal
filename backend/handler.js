const AWS = require("aws-sdk");
const UUID = require('uuid');
const withSentry = require("serverless-sentry-lib");
const { IncomingWebhook } = require("@slack/webhook");

AWS.config.update({ region: "us-east-1" });

const HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
  'Access-Control-Allow-Headers': '*',
};

const withSentryOptions = {
  captureErrors: true,
  captureUnhandledRejections: true,
  captureUncaughtException: true,
  captureMemory: true,
  captureTimeouts: true,
};

// POST /register - Adds a new registration to the database
module.exports.register = withSentry(withSentryOptions, async (event) => {
  const body = JSON.parse(event.body);
  const ddb = new AWS.DynamoDB.DocumentClient();

  // Checks if any field is missing
  if (!body.email || !body.name || !body.phone || !body.school_year) {
    return {
      statusCode: 500,
      body: "/register is missing a field",
    };
  }

  const existingReg = await ddb.get({
    TableName: process.env.REGISTRATION_TABLE,
    Key: {email: body.email.toLowerCase()}
  }).promise()

  // Generate referral ID
  var referralID;
  if (existingReg.Item != null) {
    referralID = existingReg.Item.referral_id
  } else {
    const referralBase = body.name.split(" ")[0].toLowerCase();
    do {
      referralID = referralBase + "-" + makeAddon(3);
      var referralQuery = {
        TableName: process.env.REGISTRATION_TABLE,
        IndexName: "referralsIndex",
        KeyConditionExpression: "referral_id = :v_refer",
        ExpressionAttributeValues: { ":v_refer": referralID },
      };
      var resp = await ddb.query(referralQuery).promise();
    } while (resp.Count != 0);
  }

  var params = {
    TableName: process.env.REGISTRATION_TABLE,
    Item: {
      timestamp: new Date().toISOString(),
      email: body.email.toLowerCase(),
      name: body.name,
      track: body.track_selected,
      referred_by: body.referred_by,
      referral_id: referralID,
      // pronouns: body.pronouns,
      gender: body.gender,
      ethnicity: body.ethnicity,
      school_year: body.school_year,
      major: body.major,
      recruit: body.recruit,
      portfolio: body.portfolio,
      school: body.school,
      birthday: body.birthday,
      address: body.address,
      gmaps_place_id: body.gmaps_place_id,
      address1: body.address1,
      address2: body.address2,
      city: body.city,
      state: body.state,
      zip: body.zip,
      country: body.country,
      phone: body.phone,
      resume_link: body.resume_link,
      resume_id: body.resume_id,
      MLH_emails: body.MLH_emails,
      MLH_conduct: body.MLH_conduct,
      MLH_privacy: body.MLH_privacy,
      hack_count: body.hack_count,
      question1: body.question1,
      question2: body.question2,
      dietary_restrictions: body.dietary_restrictions,
      survey_green: body.green,
      survey_red: body.red,
      survey_blue: body.blue,
      tshirt_size: body.tshirt_size,
    },
  };

  if (existingReg.Item != null && existingReg.Item.referred_by !== "") {
    params.Item.referred_by = existingReg.Item.referred_by
  }

  if (existingReg.Item != null) {
    params.Item.referral_count = existingReg.Item.referral_count
  }

  if (body.referred_by) {
    try {
      const referred_by = normalizeReferral(body.referred_by);
      params.Item.referred_by = referred_by
      body.referred_by = referred_by

      await Promise.all([
        logStatistic(ddb, "referrals", 1),
        logReferral(ddb, body.referred_by, body.name),
      ]);
    } catch (error) {
      console.error("Failed to log referral!")
      console.error(error)
    }
  }

  await Promise.all([
    logStatistic(ddb, "registrations", 1),
    // Call DynamoDB to add the item to the table
    ddb.put(params).promise(),
    // Send confirmation email
    sendConfirmationEmail(body.name, body.email, referralID, params.Item),
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

// sendConfirmationEmail uses AWS SES to send a confirmation email to the user
const sendConfirmationEmail = async (fullName, email, referralID, user) => {
  const ses = new AWS.SES();

  // As of right now, Bitcamp does not use a referral link
  // const referralLink = "https://register.gotechnica.org/" + referralID;
  const reregisterLink = "https://register.bit.camp?redo=" + email
  const firstName = fullName.split(" ")[0];

  const params = {
    Destination: { ToAddresses: [email] },
    Source: "Bitcamp <hello@bit.camp>",
    ConfigurationSetName: "registration-2022",
    Template: "DetailedHackerRegistrationConfirmation",
    TemplateData: `{\"firstName\":\"${firstName}\",\"reregisterLink\":\"${reregisterLink}\",\"email\":\"${user.email}\",\"name\":\"${user.name}\",\"pronouns\":\"${user.pronouns}\",\"birthday\":\"${user.birthday}\",\"track\":\"${user.track}\",\"phone\":\"${user.phone}\",\"school_type\":\"${user.school_year}\",\"school\":\"${user.school}\",\"address\":\"${user.address}\",\"tshirt_size\":\"${user.tshirt_size}\"}`,
  };

  return await ses.sendTemplatedEmail(params).promise();
};

const sendReferralNotificationEmail = async (fullName, email, referralID, referralName) => {
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

// =============================================================================

// POST /upload_resume - Uploads hacker resume to S3 bucket
module.exports.upload_resume = withSentry(async (event) => {
  const body = JSON.parse(event.body);

  if (!body.filename) {
    return {
      statusCode: 500,
      body: '/upload_resume is missing filename',
    };
  }

  const s3 = new AWS.S3();

  const folder = UUID.v4();
  const filePath = `${folder}/${body.filename}`;

  const params = {
    Bucket: 'bitcamp-2022-resumes',
    Key: filePath,
    Expires: 600,
    ContentType: 'multipart/form-data',
  };

  const s3Result = s3.getSignedUrl('putObject', params);

  return {
    statusCode: 200,
    body: JSON.stringify({ putUrl: s3Result, uploadUrl: `https://bitcamp-2022-resumes.s3.amazonaws.com/${filePath}` }),
    headers: HEADERS,
  };
});

// POST /upload_resume_text - Uploads text format of hacker resume to DynamoDB table
module.exports.upload_resume_text = withSentry(async (event) => {
  const body = JSON.parse(event.body);

  if (!body.user_id || !body.resume_text) {
    return {
      statusCode: 500,
      body: '/upload_resume_text is missing user_id or resume_text',
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
    body: 'success',
    headers: HEADERS,
  };
});

// POST /track - Keeps track of various user actions
module.exports.track = withSentry(async (event) => {
  const body = JSON.parse(event.body);
  const ddb = new AWS.DynamoDB.DocumentClient();
  // Checks if any field is missing
  if (!body.random_id && !body.referral_id) {
    return {
      statusCode: 500,
      body: "/track is missing a field",
    };
  }

  // Handle "how i found out about technica"
  if (body.key.startsWith("hf")) {
    body.value = event.requestContext.identity.sourceIp;
    await logStatistic(ddb, body.key, 1);
  }

  // Log user's ip
  if (body.key === "open-registration") {
    body.value = event.requestContext.identity.sourceIp;
    await logStatistic(ddb, "page-view", 1);
  }

  // Find user's random id from referral id
  if (!body.random_id) {
    var resp = await ddb
      .query({
        TableName: process.env.TRACKING_TABLE,
        IndexName: "referralsIndex",
        KeyConditionExpression: "referral_id = :v_refer",
        ExpressionAttributeValues: { ":v_refer": body.referral_id },
      })
      .promise();

    body.random_id = resp.Items[0].random_id;
  }

  // Append key:value pair to the user's row
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

  // Return success
  return {
    statusCode: 200,
    headers: HEADERS,
  };
});

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
    // check for illegal characters
    const givenChunks = referred_by.split('-');
    return (givenChunks[0] + '-' + givenChunks[1].substring(0,3));  
}

const logReferral = async (ddb, referred_by, referralName) => {
  var referralQuery = {
    TableName: process.env.REGISTRATION_TABLE,
    IndexName: "referralsIndex",
    KeyConditionExpression: "referral_id = :v_refer",
    ExpressionAttributeValues: { ":v_refer": referred_by },
  };
  const resp = await ddb.query(referralQuery).promise();
  // await sendReferralNotificationEmail(resp.Items[0].name, resp.Items[0].email, referred_by, referralName)

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
};

// /update - Sends an update to slack
module.exports.update = withSentry(async () => {
  const ddb = new AWS.DynamoDB.DocumentClient();
  const statsTable = process.env.STATISTICS_TABLE;
  const params = {
    TableName: statsTable,
    Select: "ALL_ATTRIBUTES",
  };

  // Prepare the slack webhook
  const webhookUrl = "https://hooks.slack.com/services/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";
  const webhook = new IncomingWebhook(webhookUrl);

  // Send the statistic update to slack
  var statArr = [];
  var hfArr = [];
  let registrations = 0;
  const stats = await ddb.scan(params).promise();
  stats.Items.forEach((stat) => {
    if (stat.statistic.startsWith("hf")) {
      hfArr.push(stat.value + " " + stat.statistic)
    } else if (stat.statistic === "registrations") { // save for later
      registrations = stat.value;
    } else {
      statArr.push(stat.value + " " + stat.statistic);
    }
  });
  statArr.unshift("~~~~~~~~~~~");
  statArr.unshift("*" + registrations + " registrations*");
  statArr = statArr.concat("~~~~~~~~~~~", hfArr.sort())

  await webhook.send({
    text:
      `Registration update for ` +
      `${new Date().toLocaleString("en-US", {
        timeZone: "America/New_York",
        dateStyle: "short",
        timeStyle: "short"
      })} ET:\n\n` +
      `${Array.from(statArr).join("\n")}`,
  });
});
