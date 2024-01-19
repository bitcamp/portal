const AWS = require('aws-sdk');
const Papa = require('papaparse');
const { Console } = require('console');
const fs = require('fs');

AWS.config.update({ region: 'us-east-1' });
const ses = new AWS.SES();
const ddb = new AWS.DynamoDB.DocumentClient();

let template = fs.readFileSync('./templates/hypecamp_template.html', 'utf8');
let users = Papa.parse(fs.readFileSync('./hypecamp-users.csv', 'utf8'), { header: true });
// template = template.replace('{header text}',);
let main_template = {
  Template: {
    TemplateName: "HypecampTemplate",
    SubjectPart: "You're invited to Bytecamp Hype Camp!",
    TextPart: `Hey {{name}}, thanks for registering for Bitcamp 2024! 
    \n\nBitcamp is only a few weeks away, and we know you’re as excited as we are! But why wait to
    \n\nget in on the fun? Do you want a chance to meet other hackers, form new friendships, and 
    \n\nmake a team before Bitcamp officially starts? If so, join us in Edward St. John Learning and
    \n\nTeaching Center (ESJ) Room 1202 for our “Bytecamp Hype Camp” event on March 31st from 
    \n\n7-8 pm to form new bonds, eat Maryland Dairy, and win some awesome swag! Interested in 
    \n\ncoming? Fill out the RSVP form! https://forms.gle/uubxB22vTzrpBo7x7
    \n\nHope to see you there!
    \n\nBitcamp Organizing Team`,
    HtmlPart: template,
  }
};

(async function () {
  // var templatePromise1 = ses.createTemplate(main_template).promise();
  var templatePromise1 = ses.updateTemplate(main_template).promise();

  // Handle promise's fulfilled/rejected states
  templatePromise1.then(
    function (data) {
      console.log(data);
    }
  ).catch(
    function (err) {
      console.error(err, err.stack);
    }
  );
})();

let main_emails = [];
let main_users = [];
let minor_emails = [];

function sleep(ms) {
  return new Promise((resolve) => {
     setTimeout(resolve, ms)
 })
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
        registrationResults = [
          registrationResults,
          ...data.Items,
        ];
      }
      // If we reached the 1MB limit, we scan some more with the old startKey
      if (typeof data.LastEvalutedKey !== 'undefined') {
        params.ExclusiveStartKey = data.LastEvalutedKey;
      } else {
        done = true;
      }
    });
    await sleep(1000)
  } while (!done);

  return registrationResults;
};

const fileName = `./hypecamp-users2.csv`;

(async function () {
  const result = await downloadRegistrations('prd');

  let user_set = new Set(users.data.map((user) => user.email));

  result.forEach(element => {
    if (element.email && !user_set.has(element.email)) {
      if (element.school) {
        if (element.school.toLowerCase() == "University of Maryland at College Park".toLowerCase()
        || element.school.toLowerCase() == "UMD".toLowerCase()
        || element.school.toLowerCase() == "University of Maryland College Park".toLowerCase()) {
          main_emails.push({
            "Destination": {
              "ToAddresses": [
                element.email,
              ]
            },
            "ReplacementTemplateData": "{ \"name\":\"" + element.name.split(" ")[0] + "\"}"
          });
          console.log(element.email);
  
          main_users.push(element);
        }
      }
    }
  });

  fs.writeFileSync(fileName, '');
  const csv = Papa.unparse(main_users);
  fs.appendFile(fileName, csv, err => {
    if (err) console.log(err);
  });

  console.log(main_emails.length);

  const chunkSize = 50;
  for (let i = 0; i < main_emails.length; i += chunkSize) {
    const chunk = main_emails.slice(i, i + chunkSize);

    const main_params = {
      Destinations: chunk,
      ConfigurationSetName: 'registration-2024',
      Source: '"Bitcamp Team" <hello@bit.camp>', // required
      Template: "HypecampTemplate",
      DefaultTemplateData: '{ \"name\":\"Participant\" }',
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
