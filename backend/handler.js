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
   || !body.school) {
    return {
      statusCode: 500,
      body: '/register is missing a field',
    };
  }

  const params = {
    TableName: process.env.REGISTRATION_TABLE,
    Item: {},
  };

  // TODO: maybe do it manually instead of dynamically
  // Dynamically add post request body params to document
  Object.keys(body).forEach((k) => {
    params.Item[k] = body[k];
  });

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

  // Add referral id to user
  params.Item["referral_id"] = referralID;

  // Call DynamoDB to add the item to the table
  await ddb.put(params).promise();

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

const makeAddon = (length) => {
  var result = [];
  var chars = 'abcdefghjkmnpqrstuvwxyz23456789'; // avoid i, l , o, 0, 1
  for ( var i = 0; i < length; i++ ) {
    result.push(chars.charAt(Math.floor(Math.random() * chars.length)));
  }
  return result.join('');
}