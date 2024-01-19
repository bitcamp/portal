const AWS = require('aws-sdk');
const Papa = require('papaparse');
const { Console } = require('console');
const fs = require('fs');

AWS.config.update({ region: 'us-east-1' });
const ses = new AWS.SES();
const ddb = new AWS.DynamoDB.DocumentClient();

let template = fs.readFileSync(
  `${__dirname}/templates/quantum_template.html`,
  'utf8'
);
// template = template.replace('{header text}',);
let main_template = {
  Template: {
    TemplateName: 'QuantumTemplate',
    SubjectPart: 'Follow Up: Bitcamp Quantum Track Update',
    TextPart: `Hey {{name}} 
    \n\nWe hope you're as excited as we are for Bitcamp this weekend! We wanted to send a
    \nreminder to fill out the sub-track selection form (https://docs.google.com/forms/d/e/1FAIpQLScGHABG_fjzWgXYkqnf6uRIAg4NCy35N4g6PAu1sv1dvfrNqw/viewform). 
    \nThis form is to indicate whether you will be pursuing the Beginner Quantum track or
    \nthe Advanced Quantum track.
    \n\nPlease fill out this form as soon as possible as it will allow us to have an
    \naccurate headcount and provide the best possible experience for everyone registered
    \nfor this track. If you’ve already filled out this form, no further action is needed
    \nat this time.
    \n\nWe appreciate your time and look forward to welcoming you to a great Bitcamp weekend!
    \n\nSee you by the campfire!
    \nBitcamp Organizing Team`,
    HtmlPart: template,
  },
};

(async function () {
  // var templatePromise1 = ses.createTemplate(main_template).promise();
  var templatePromise1 = ses.updateTemplate(main_template).promise();

  // Handle promise's fulfilled/rejected states
  templatePromise1
    .then(function (data) {
      console.log(data);
    })
    .catch(function (err) {
      console.error(err, err.stack);
    });
})();

let main_emails = [];
let main_users = [];

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

const downloadRegistrations = async (stage) => {
  const fullTableName = `portal-${stage}-registration`;
  let params = {
    TableName: fullTableName,
  };

  registrationResults = [];

  // We'll be looping through repeatedly, appending
  done = false;
  do {
    ddb.scan(params, (err, data) => {
      if (err) console.log(err);
      else {
        data.Items.forEach((item) => registrationResults.push(item));
      }
      // If we reached the 1MB limit, we scan some more with the old startKey
      if (typeof data.LastEvaluatedKey !== 'undefined') {
        params.ExclusiveStartKey = data.LastEvaluatedKey;
      } else {
        done = true;
      }
    });
    await sleep(1000);
  } while (!done);

  return registrationResults;
};

const fileName = `./quantum-users.csv`;

(async function () {
  const result = await downloadRegistrations('prd');

  // Send email to all registered quantum track hackers
  result.forEach((element) => {
    if (element.track && element.email) {
      if (element.track === 'quantum') {
        main_emails.push({
          Destination: {
            ToAddresses: [element.email],
          },
          ReplacementTemplateData: '{ "name":"' + element.first_name + '"}',
        });
        console.log(element.email);

        main_users.push(element);
      }
    }
  });

  fs.writeFileSync(fileName, '');
  const csv = Papa.unparse(main_users);
  fs.appendFile(fileName, csv, (err) => {
    if (err) console.log(err);
  });

  console.log(main_emails.length);

  const chunkSize = 50;
  for (let i = 0; i < main_emails.length; i += chunkSize) {
    const chunk = main_emails.slice(i, i + chunkSize);

    const main_params = {
      Destinations: chunk,
      ConfigurationSetName: 'registration-2024',
      Source: '"Bitcamp Team" <hello@bit.camp>' /* required */,
      Template: 'QuantumTemplate',
      DefaultTemplateData: '{ "name":"Camper" }',
    };
    ses.sendBulkTemplatedEmail(main_params, (err, data) => {
      if (err) console.log(err, err.stack); // an error occurred
      else console.log(data); // successful response
    });
  }

  // const main_params = {
  //   Destinations: [
  //     main_emails,
  //   ],
  //   ConfigurationSetName: 'platform_prod',
  //   Source: 'hello@bit.camp', /* required */
  //   Template: "MainTemplate",
  //   DefaultTemplateData: '{ \"name\":\"Participant\" }',
  // };
  // ses.sendBulkTemplatedEmail(main_params, (err, data) => {
  //   if (err) console.log(err, err.stack); // an error occurred
  //   else console.log(data); // successful response
  // });
})();
