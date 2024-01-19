const AWS = require('aws-sdk');
const Papa = require('papaparse');
const { Console } = require('console');
const fs = require('fs');

AWS.config.update({ region: 'us-east-1' });
const ses = new AWS.SES();
const ddb = new AWS.DynamoDB.DocumentClient();

let template = fs.readFileSync(
  `${__dirname}/templates/hardware_template.html`,
  'utf8'
);
// template = template.replace('{header text}',);
let main_template = {
  Template: {
    TemplateName: 'HardwareTemplate',
    SubjectPart: 'Bitcamp Hardware Track Reminder',
    TextPart: `Hey {{name}} 
    \n\nGet pumped for Bitcamp weekend! Want to take your hack to the next level?
    \nBring your own hardware tools and materials, including arduinos, breadboards,
    \ncircuits, servos, etc. Please DO NOT bring 3D printers, as they will be provided,
    \nsoldering irons, or any other tools that may cause a fire hazard.
    \n\nSee you this Friday at 4:00pm by the campfire!
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

const fileName = `./hardware-users.csv`;

(async function () {
  const result = await downloadRegistrations('prd');

  // Send email to all registered hardware track hackers
  result.forEach((element) => {
    if (element.track && element.email) {
      if (
        element.track === 'hardware' ||
        element.track_waitlist === 'hardware'
      ) {
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

  const chunkSize = 50;
  for (let i = 0; i < main_emails.length; i += chunkSize) {
    const chunk = main_emails.slice(i, i + chunkSize);

    const main_params = {
      Destinations: chunk,
      ConfigurationSetName: 'registration-2024',
      Source: '"Bitcamp Team" <hello@bit.camp>' /* required */,
      Template: 'HardwareTemplate',
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
