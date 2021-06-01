const AWS = require('aws-sdk');
const withSentry = require('serverless-sentry-lib');

AWS.config.update({ region: 'us-east-1' });

// POST /register - Adds a new registration to the database
module.exports.register = withSentry(async (event) => {
  const body = JSON.parse(event.body);
  const ddb = new AWS.DynamoDB.DocumentClient();

  // Checks if any field is missing
  if (!body.email
   || !body.name
   || !body.school_type) {
    return {
      statusCode: 500,
      body: '/register is missing a field',
    };
  }

  // Generate referral ID
  const referralBase = body.name.split(" ")[0].toLowerCase();
  var referralID;
  do {
    referralID = referralBase + "-" + makeAddon(3);
    var referralQuery = {
      TableName: process.env.REGISTRATION_TABLE,
      IndexName: "referralsIndex",
      KeyConditionExpression: "referral_id = :v_refer",
      ExpressionAttributeValues: { ":v_refer": referralID }
  };
    var resp = await ddb.query(referralQuery).promise();
  } while (resp.Count != 0);

  const params = {
    TableName: process.env.REGISTRATION_TABLE,
    Item: {
      timestamp: new Date().toISOString(),
      email: body.email.toLowerCase(),
      name: body.name,
      pronouns: body.pronouns,
      school_type: body.school_type,
      address: body.address,
      gmaps_place_id: body.gmaps_place_id,
      address2: body.address2,
      referred_by: body.referred_by,
      referral_id: referralID,
    },
  };

  // Call DynamoDB to add the item to the table
  await ddb.put(params).promise();

  // Send confirmation email
  await sendConfirmationEmail(body.name, body.email, referralID)

  // Returns status code 200 and JSON string of 'result'
  return {
    statusCode: 200,
    body: JSON.stringify(params.Item),
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
  };
});

// makeAddon generates a random string of `length`
const makeAddon = (length) => {
  var result = [];
  var chars = 'abcdefghjkmnpqrstuvwxyz23456789'; // avoid i, l , o, 0, 1
  for ( var i = 0; i < length; i++ ) {
    result.push(chars.charAt(Math.floor(Math.random() * chars.length)));
  }
  return result.join('');
}

// sendConfirmationEmail uses AWS SES to send a confirmation email to the user
const sendConfirmationEmail = async (fullName, email, referralID) => {
  const ses = new AWS.SES();
  
  const referralLink = "https://register.gotechnica.org/" + referralID;
  const firstName = fullName.split(" ")[0];
  
  const params = {
    Destination: { ToAddresses: [ email ] },
    Source: 'Technica <hello@gotechnica.org>',
    ConfigurationSetName: 'registration-2021',
    Template: 'HackerRegistrationConfirmation',
    TemplateData: `{ \"firstName\":\"${firstName}\", \"referralLink\": \"${referralLink}" }`,
  };

  return await ses.sendTemplatedEmail(params).promise();
}

// =============================================================================

// POST /track - Keeps track of various user actions
module.exports.track = withSentry(async (event) => {
  const body = JSON.parse(event.body);
  const ddb = new AWS.DynamoDB.DocumentClient();

  // Checks if any field is missing
  if (!body.random_id && !body.referral_id) {
    return {
      statusCode: 500,
      body: '/track is missing a field',
    };
  }


  // Find user's random id from referral id
  if (!body.random_id) {
    var resp = await ddb.query({
      TableName: process.env.TRACKING_TABLE,
      IndexName: "referralsIndex",
      KeyConditionExpression: "referral_id = :v_refer",
      ExpressionAttributeValues: { ":v_refer": body.referral_id }
    }).promise();

    body.random_id = resp.Items[0].random_id;
  }

  // Append key:value pair to the user's row
  await ddb.update({
    TableName: process.env.TRACKING_TABLE,
    Key: { random_id: body.random_id },
    ReturnValues: 'ALL_NEW',
    UpdateExpression: 'set #key = :value',
    ExpressionAttributeNames: { '#key': body.key },
    ExpressionAttributeValues: { ':value': body.value, }
  }).promise()

  // Return success
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
  };
});

