const AWS = require('aws-sdk');
const Papa = require('papaparse');
const { Console } = require('console');
const fs = require('fs');

AWS.config.update({ region: 'us-east-1' });
const ses = new AWS.SES();
const ddb = new AWS.DynamoDB.DocumentClient();

let template = fs.readFileSync('./templates/quantum_template.html', 'utf8');
// template = template.replace('{header text}',);
let main_template = {
  Template: {
    TemplateName: 'QuantumTemplate',
    SubjectPart: 'Bitcamp Quantum Track Update',
    TextPart: `Hey {{name}} 
    \n\nAll of us are super excited for Bitcamp 2023 this April 7-9! As we're gearing up to
    \nstart we wanted to gauge interest in The Quantum Track having two different levels:
    \nan intro level and advanced level.
    \n\nThe introduction level would be suggested for beginner hackers / people who don't
    \nhave much experience with quantum. On the other hand, the advanced level would have a
    \nmore open-ended prompt, this level would be suggested for hackers who attended the 
    \nquantum track last year (Bitcamp 2022) or have experience with quantum.
    \n\nPlease fill out the following form ASAP: https://docs.google.com/forms/d/e/1FAIpQLScGHABG_fjzWgXYkqnf6uRIAg4NCy35N4g6PAu1sv1dvfrNqw/viewform
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
        registrationResults = [registrationResults, ...data.Items];
      }
      // If we reached the 1MB limit, we scan some more with the old startKey
      if (typeof data.LastEvalutedKey !== 'undefined') {
        params.ExclusiveStartKey = data.LastEvalutedKey;
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
      ConfigurationSetName: 'registration-2023',
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
