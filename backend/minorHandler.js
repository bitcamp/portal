const AWS = require("aws-sdk");
const withSentry = require("serverless-sentry-lib");

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

// POST /register-minor - Adds a new minor waiver form to the database
module.exports.registerMinor = withSentry(withSentryOptions, async (event) => {
  const body = JSON.parse(event.body);
  const ddb = new AWS.DynamoDB.DocumentClient();

  // Checks if email is missing
  if (!body.email) {
    return {
      statusCode: 500,
      body: "/register-minor is missing email field",
      headers: HEADERS,
    };
  }

  const existingReg = await ddb.get({
    TableName: process.env.MINOR_TABLE,
    Key: {email: body.email.toLowerCase()}
  }).promise();

  var params = {
    TableName: process.env.MINOR_TABLE,
    Item: {
      timestamp: new Date().toISOString(),
      email: body.email.toLowerCase(),
      chap_esig: body.chap_esig,
      chap_date_signed: body.chap_date_signed,
      minor_date_signed: body.minor_date_signed,
      prin_date_signed: body.prin_date_signed,
      terms_date_signed: body.terms_date_signed,
      terms_esig : body.terms_esig,
      chap_esig : body.chap_esig,
      minor_esig : body.minor_esig,
      chap_name : body.chap_name,
      chap_rel : body.chap_rel,
      minor_name : body.minor_name,
      prin_esig : body.prin_esig
    },
  };
    
  await Promise.all([
    // Call DynamoDB to add the item to the table
    ddb.put(params).promise(),
    // Send confirmation email
    sendConfirmationEmail(params.Item),
  ]);

  // Returns status code 200 and JSON string of 'result'
  return {
    statusCode: 200,
    body: JSON.stringify(params.Item),
    headers: HEADERS,
  };
}); 

// sendConfirmationEmail uses AWS SES to send a confirmation email to the user
const sendConfirmationEmail = async (waiver) => {
  const ses = new AWS.SES();

  const resubmitLink = "https://register.bit.camp/minor-waiver?redo=" + waiver.email;

  const params = {
    Destination: { ToAddresses: [waiver.email] },
    Source: "Bitcamp <hello@bit.camp>",
    ConfigurationSetName: "registration-2026",
    Template: "MinorWaiverConfirmation",
    TemplateData: `{\"email\":\"${waiver.email}\",\"resubmitLink\":\"${resubmitLink}\",\"guardianName\":\"${waiver["Guardian Name (Chap)"]}\",\"minorName\":\"${waiver["Name (Terms)"]}\",\"dateSigned\":\"${waiver["Date Signed (Terms)"]}\"}`,
  };

  return await ses.sendTemplatedEmail(params).promise();
};