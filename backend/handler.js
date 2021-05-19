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

  // Dynamically add post request body params to document
  Object.keys(body).forEach((k) => {
    params.Item[k] = body[k];
  });

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