const AWS = require('aws-sdk');
const Papa = require('papaparse');
const { Console } = require('console');
const fs = require('fs');

AWS.config.update({ region: 'us-east-1' });
const ses = new AWS.SES();
const ddb = new AWS.DynamoDB.DocumentClient();

let template = fs.readFileSync(
  './templates/hackathons_101_rsvp_template.html',
  'utf8'
);
// template = template.replace('{header text}',);
let main_template = {
  Template: {
    TemplateName: 'Hackathons101RSVPTemplate',
    SubjectPart: 'Reminder: Hackathons 101 Tonight!',
    TextPart: `Hey {{name}}
    \n\nThank you for RSVP-ing for Hackathons 101! We hope you’re as excited as we are for
    \nthis community event and Bitcamp!
    \n\nAs a reminder, we’re hosting our event tonight in Edward St. John Learning and
    \nTeaching Center (ESJ) Room 2204 from 8-9 PM to learn about Bitcamp, meet some workshop
    \nhosts and other hackers, and snack on some Insomnia cookies!
    \n\nHave friends that are interesting in coming? Have them fill out the RSVP form at
    \nthis link: https://bit.camp/hack101-rsvp
    \n\nWe can’t wait to see you tonight!
    \nBitcamp Orgaanizing Team`,
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

// const downloadRegistrations = async (stage) => {
//   const fullTableName = `portal-${stage}-registration`;
//   let params = {
//     TableName: fullTableName,
//   };

//   registrationResults = [];

//   // We'll be looping through repeatedly, appending
//   done = false;
//   do {
//     ddb.scan(params, (err, data) => {
//       if (err) console.log(err);
//       else {
//         registrationResults = [registrationResults, ...data.Items];
//       }
//       // If we reached the 1MB limit, we scan some more with the old startKey
//       if (typeof data.LastEvalutedKey !== 'undefined') {
//         params.ExclusiveStartKey = data.LastEvalutedKey;
//       } else {
//         done = true;
//       }
//     });
//     await sleep(1000);
//   } while (!done);

//   return registrationResults;
// };

const fileNameOriginal = `./hackathons-101-rsvp-users-original.csv`;
const fileName = `./hackathons-101-rsvp-users.csv`;

(async function () {
  // const result = await downloadRegistrations('prd');

  // Send email to everyone who RSVP-ed
  let result = Papa.parse(fs.readFileSync(fileNameOriginal, 'utf8'), {
    header: true,
  }).data.map((user) => {
    return { email: user['Email'], first_name: user['First Name'] };
  });

  result.forEach((element) => {
    main_emails.push({
      Destination: {
        ToAddresses: [element.email],
      },
      ReplacementTemplateData: '{ "name":"' + element.first_name + '"}',
    });
    console.log(element.email);

    main_users.push(element);
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
      Source: 'hello@bit.camp' /* required */,
      Template: 'Hackathons101RSVPTemplate',
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
