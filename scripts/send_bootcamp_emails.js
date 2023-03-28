const AWS = require('aws-sdk');
const Papa = require('papaparse');
const { Console } = require('console');
const fs = require('fs');

AWS.config.update({ region: 'us-east-1' });
const ses = new AWS.SES();
const ddb = new AWS.DynamoDB.DocumentClient();

let template = fs.readFileSync('./templates/bootcamp_template.html', 'utf8');
let rsvp = Papa.parse(
  fs.readFileSync('./bootcamp-rsvp-users-original.csv', 'utf8'),
  {
    header: true,
  }
);
// template = template.replace('{header text}',);
let main_template = {
  Template: {
    TemplateName: 'BootcampTemplate',
    SubjectPart: 'Bitcamp Bootcamp Community Event + Sponsor Fair!',
    TextPart: `Hey {{name}} 
    \n\nWe're excited to welcome you and other Bitcampers to Bitcamp Bootcamp, a
    \nfun-filled community event before the big weekend! As a reminder, this event
    \nwill be held on Thursday, March 30th from 8-9:30pm at ESJ 2204.
    \n\nJoin us to learn more about bitcamp, find potential teammates, eat some
    \nMaryland Dairy, and engage in exclusive networking with sponsors.
    \n\nHave friends who are interested in coming? Have them fill out the RSVP form
    \nat this link: https://bit.camp/bootcamp-rsvp.
    \n\nWe're excited to see you this Thursday!
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

const fileName = `./bootcamp-users.csv`;

(async function () {
  const result = await downloadRegistrations('prd');

  // Don't send email to people who already RSVP-ed
  let rsvp_set = new Set(rsvp.data.map((user) => user.Email));

  // Send email to all registered UMD students
  result.forEach((element) => {
    if (element.school && element.email && !rsvp_set.has(element.email)) {
      if (element.school === 'The University of Maryland, College Park') {
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
      Template: 'BootcampTemplate',
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
