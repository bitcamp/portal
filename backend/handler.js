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
      email: body.email,
      name: body.name,
      school_type: body.school_type,
      address: body.address,
      gmaps_place_id: body.gmaps_place_id,
      address1: body.address1,
      address2: body.address2,
      city: body.city,
      state: body.state,
      zip: body.zip,
      country: body.country,
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
  // Create referral link
  const referralLink = "https://register.gotechnica.org/" + referralID;

  const params = {
    Destination: {
      ToAddresses: [ email ],
    },
    Message: {
      Body: {
        Html: {
          Data: 
              `Hello ${fullName}, <br />
              Thanks for registering for Technica 2021! <br /><br />

              Here's your custom referral link - you can win prizes and swag by having your friends use it to register for Technica as well! <br/ > <br />

              <a href="${referralLink}">${referralLink}</a>

              <br /><br />Best,
              <br /><br /> The Technica Organizing Team`,
        },
      },
      Subject: {
        Data: "You're registered for Technica 2021! Now refer your friends!",
      },
    },
    Source: 'hello@gotechnica.org',
    ConfigurationSetName: 'registration-2021'
  };
  return await ses.sendEmail(params).promise();
}
