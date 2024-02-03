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

// POST /registerVolunteer - Adds a new volunteer registration to the database
module.exports.registerVolunteer = withSentry(withSentryOptions, async (event) => {
  const body = JSON.parse(event.body);
  const ddb = new AWS.DynamoDB.DocumentClient();

  // Checks if any field is missing
  if (!body.email || !body.name || !body.phone || !body.school_year) {
    return {
      statusCode: 500,
      body: "/registerVolunteer is missing a field",
    };
  }

  const existingReg = await ddb.get({
    TableName: process.env.VOLUNTEER_TABLE,
    Key: {email: body.email.toLowerCase()}
  }).promise()

  
  var params = {
    TableName: process.env.VOLUNTEER_TABLE,
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
      company: body.company,
      school_year: body.school_year,
      school: body.school,
      school_other: body.school_other,
      tshirt_size: body.tshirt_size,
      dietary_restrictions: body.dietary_restrictions,
    },
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
    
  await Promise.all([
    logStatistic(ddb, "volunteerRegistrations", 1),
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
  const reregisterLink = "https://register.bit.camp?redo=" + user.email;

  // Capitalize track
  const track = user.track
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  // Keep this the same as in RegistrationForm.vue
  const school_year_options = [
    { value: "less than high school", text: "Less than Secondary / High School" },
    { value: "high school", text: "Secondary / High School" },
    { value: "undergrad 2 year", text: "Undergraduate University (2 year - community college or similar)" },
    { value: "undergrad 3+ year", text: "Undergraduate University (3+ year)" },
    { value: "grad", text: "Graduate University (Masters, Professional, Doctoral, etc)" },
    { value: "bootcamp", text: "Code School / Bootcamp" },
    { value: "vocational", text: "Other Vocational / Trade Program or Apprenticeship" },
    { value: "postdoc", text: "Post Doctorate" },
    { value: "other", text: "Other" },
    { value: "not a student", text: "I’m not currently a student" },
    { value: "prefer not to answer", text: "Prefer not to answer" },
  ];

  // School year text
  const schoolYear = school_year_options
    .find(option => option.value === user.school_year).text;

  // All caps t shirt size
  const tShirtSize = user.tshirt_size.toUpperCase();

  const params = {
    Destination: { ToAddresses: [user.email] },
    Source: "Bitcamp <hello@bit.camp>",
    ConfigurationSetName: "registration-2024",
    Template: "DetailedVolunteerRegistrationConfirmation",
    TemplateData: `{\"firstName\":\"${user.first_name}\",\"reregisterLink\":\"${reregisterLink}\",\"email\":\"${user.email}\",\"name\":\"${user.name}\",\"pronouns\":\"${user.pronouns}\",\"age\":\"${user.age}\",\"track\":\"${track}\",\"phone\":\"${user.phone}\",\"school_type\":\"${schoolYear}\",\"school\":\"${user.school}\",\"address\":\"${user.address}\",\"tshirt_size\":\"${tShirtSize}\"}`,
  };

  return await ses.sendTemplatedEmail(params).promise();
};