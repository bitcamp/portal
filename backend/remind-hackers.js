const csv = require('csvtojson');
const AWS = require("aws-sdk");

AWS.config.update({ region: "us-east-1" });

  // Convert a csv file with csvtojson
csv()
.fromFile('./table-data.csv')
.then(async (csvResult) => {
  for (const user of csvResult) {
    await sendConfirmationEmail(user);
  }
});

const sendConfirmationEmail = async (user) => {
  const ses = new AWS.SES();

  // TODO GRAB REFERRAL ID
  const referralLink = "https://register.gotechnica.org/" + user.referral_id;
  const reregisterLink = "https://register.gotechnica.org?redo=" + user.email
  const firstName = user.name.split(" ")[0];

  const params = {
    Destination: { ToAddresses: [user.email] },
    Source: "Technica <hello@gotechnica.org>",
    ConfigurationSetName: "registration-2021",
    Template: "DetailedHackerRegistrationConfirmation",
    TemplateData: `{\"firstName\":\"${firstName}\",\"referralLink\":\"${referralLink}\",\"reregisterLink\":\"${reregisterLink}\",\"email\":\"${user.email}\",\"name\":\"${user.name}\",\"pronouns\":\"${user.pronouns}\",\"birthday\":\"${user.birthday}\",\"track\":\"${user.track}\",\"phone\":\"${user.phone}\",\"school_type\":\"${user.school_type}\",\"school\":\"${user.school}\",\"address\":\"${user.address1}\"}`,
  };

  await sleep(100);
  console.log(`Emailing ${user.name} ${user.email}`);
  return await ses.sendTemplatedEmail(params).promise();
};


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}