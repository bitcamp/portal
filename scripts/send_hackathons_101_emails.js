const AWS = require('aws-sdk');
const Papa = require('papaparse');
const { Console } = require('console');
const fs = require('fs');

AWS.config.update({ region: 'us-east-1' });
const ses = new AWS.SES();
const ddb = new AWS.DynamoDB.DocumentClient();

let template = fs.readFileSync(
  './templates/hackathons_101_template.html',
  'utf8'
);
let rsvp = Papa.parse(
  fs.readFileSync('./hackathons-101-rsvp-users.csv', 'utf8'),
  { header: true }
);
// template = template.replace('{header text}',);
let main_template = {
  Template: {
    TemplateName: 'Hackathons101Template',
    SubjectPart: 'Hackathons 101 Community Event Tonight!',
    TextPart: `Hey {{name}} 
    \n\nThank you for registering for Bitcamp! Our hackathon’s only a few weeks away and we hope
    \nyou’re as excited as we are!
    \n\nTo gear up for Bitcamp 2025, we’re hosting our first community event, Hackathons 101,
    \ntonight in Edward St. John Learning and Teaching Center (ESJ) Room 2204 from 8-9 PM.
    \nJoin us to learn more about Bitcamp, meet some workshop hosts and other hackers, and
    \nsnack on some Insomnia cookies! Fill out this RSVP form if you’re interested:
    \nhttps://bit.camp/hack101-rsvp
    \n\nWe can’t wait to see you tonight!
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

const fileName = `./hackathons-101-users.csv`;

(async function () {
  const result = await downloadRegistrations('prd');

  // Don't send email to people who already RSVP-ed
  let rsvp_set = new Set(rsvp.data.map((user) => user.email));

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
      ConfigurationSetName: 'registration-2024',
      Source: '"Bitcamp Team" <hello@bit.camp>' /* required */,
      Template: 'Hackathons101Template',
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
