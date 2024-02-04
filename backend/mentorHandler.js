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

// POST /registerMentor - Adds a new mentor registration to the database
module.exports.registerMentor = withSentry(withSentryOptions, async (event) => {
  const body = JSON.parse(event.body);
  const ddb = new AWS.DynamoDB.DocumentClient();

  // Checks if any field is missing
  if (!body.email || !body.name || !body.phone) {
    return {
      statusCode: 500,
      body: "/register-mentor is missing a field",
    };
  }

  const existingReg = await ddb.get({
    TableName: process.env.MENTOR_TABLE,
    Key: {email: body.email.toLowerCase()}
  }).promise()

  
  var params = {
    TableName: process.env.MENTOR_TABLE,
    Item: {
      timestamp: new Date().toISOString(),
      email: body.email.toLowerCase(),
      phone: body.phone,
      MLH_emails: body.MLH_emails,
      MLH_conduct: body.MLH_conduct,
      MLH_privacy: body.MLH_privacy,
      name: body.name,
      first_name: body.first_name,
      last_name: body.last_name,
      skill: body.skill,
      major: body.major,
      company: body.company,
      school_year: body.school_year,
      school: body.school,
      school_other: body.school_other,
      tshirt_size: body.tshirt_size,
      prev_mentor_experience: body.prev_mentor_experience,
      prev_track_experience: body.prev_track_experience,
      mentor_tracks: body.mentor_tracks,
      dietary_restrictions: body.dietary_restrictions,
      languages: body.languages,
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
const sendConfirmationEmail = async (user) => {
  const ses = new AWS.SES();

  // As of right now, Bitcamp does not use a referral link
  // const referralLink = "https://register.gotechnica.org/" + referralID;
  const reregisterLink = "https://register.bit.camp/mentor?redo=" + user.email;

  // // School year text
  // const schoolYear = school_year_options
  //   .find(option => option.value === user.school_year).text;

  const schoolOrCompany = user.school || user.company;
  // All caps t shirt size
  const tShirtSize = user.tshirt_size.toUpperCase();

  const params = {
    Destination: { ToAddresses: [user.email] },
    Source: "Bitcamp <hello@bit.camp>",
    ConfigurationSetName: "registration-2024",
    Template: "DetailedMentorRegistrationConfirmation",
    TemplateData: `{\"firstName\":\"${user.first_name}\",\"reregisterLink\":\"${reregisterLink}\",\"email\":\"${user.email}\",\"name\":\"${user.name}\",\"age\":\"${10}\",\"phone\":\"${user.phone}\",\"tshirt_size\":\"${tShirtSize}\"},\"school_company\":\"${schoolOrCompany}\"`,
  };

  return await ses.sendTemplatedEmail(params).promise();
};