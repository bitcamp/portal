const AWS = require('aws-sdk');
const Papa = require('papaparse');
const fs = require('fs');
const { Console } = require('console');

AWS.config.update({ region: 'us-east-1' });
const ses = new AWS.SES();
const ddb = new AWS.DynamoDB.DocumentClient();

let main_html = fs.readFileSync('./templates/rsvp_template.html', 'utf8');
let minors_html = fs.readFileSync('./templates/minors_rsvp_template.html', 'utf8');
let old_minors = Papa.parse(fs.readFileSync('./minors-list.csv', 'utf8'), { header: true });

// let template = fs.readFileSync('../users/email_template.html', 'utf8');
// template = template.replace('{header text}',);
let main_template = {
  Template: {
    TemplateName: "MainTemplate",
    SubjectPart: "RSVP for Bitcamp 2026!",
    TextPart: `Hey {{name}}, thanks for registering for Bitcamp 2026! 
    \n\nWe're excited to have you join us at Bitcamp 2026!
    \n\nBefore you come, we want to make sure that we're ready to make Bytecamp the best Bitcamp ever!
    \n\nPlease fill out this RSVP form {{link}} so that we have a better idea of how many people are coming to Bitcamp 2026.
    \n\nSee you by the campfire! The Bitcamp Organizing Team`,
    HtmlPart: main_html,
  }
};

let minor_template = {
  Template: {
    TemplateName: "MinorTemplate",
    SubjectPart: "Action Needed, Complete your Minor Application for Bitcamp 2026!",
    TextPart: `Hey {{name}}, thanks for registering for Bitcamp 2026! 
    \n\nWe noticed that on your registration form you'll be under 18 by the time Bitcamp rolls around. For legal reasons, we'll need you to fill out 
    \n\nthis minors application https://forms.gle/6SS6oFnHFWBEdUYN8 to complete your registration.
    \n\nYou can also find this on our website at bit.camp! If you have any questions, contact us at hello@bit.camp and we'll be happy to help you out!
    \n\nSee you by the campfire! The Bitcamp Organizing Team`,
    HtmlPart: minors_html,
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

  // var templatePromise2 = ses.createTemplate(minor_template).promise();
  var templatePromise2 = ses.updateTemplate(minor_template).promise();

  // Handle promise's fulfilled/rejected states
  templatePromise2.then(
    function (data) {
      console.log(data);
    }
  ).catch(
    function (err) {
      console.error(err, err.stack);
    }
  );
})();

// if you're 18 by the first day of bitcamp that means you were born <= Apr 8 2004
// monthIndex for April is 3
let cutoff = new Date(2007, 3, 8);

const scan_params = {
  TableName: 'minor-dev-waiver-forms',
};

let main_emails = [];
let main_users = [];
let minor_emails = [];
let minor_users = [];

function sleep(ms) {
  return new Promise((resolve) => {
     setTimeout(resolve, ms)
 })
}

const downloadRegistrations = async (stage) => {
  const fullTableName = `minor-${stage}-waiver-forms`;
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

const mainFile = `./rsvp-users.csv`;
const minorsFile = `./rsvp-minors-users.csv`;

(async function () {
  const result = await downloadRegistrations('dev');

  let minor_set = new Set(old_minors.data.map((user) => user.Email));

  // let temp = await downloadRegistrations('dev');
  // temp.forEach(element => {
  //   console.log(new Date(element.birthday));
  // })


  // let result = {};
  // result = [
  //   {
  //     "name": "Anson Chen",
  //     "birthday": new Date(2005, 11, 24, 10, 33, 30),
  //     "email": "anson.prima@gmail.com",
  //   }
  // ]

  result.forEach(element => {
    try {
      if (new Date(element.birthday) < cutoff) {
        main_emails.push({
          "Destination": {
            "ToAddresses": [
              element.email,
            ]
          },
          "ReplacementTemplateData": JSON.stringify({
            "name": element.name.split(" ")[0],
            "link": "https://docs.google.com/forms/d/e/1FAIpQLSehul00a34SEH-cZ0u8VoaR2H-xyFF3V-RACwlPurFQufKiMA/viewform?entry.1444202695=" + element.name + "&entry.369431247=" + encodeURIComponent(element.email)
          })
        });
        console.log(element.email);
  
        main_users.push(element);
      } else {
        if (!minor_set.has(element.email))
        {
          minor_emails.push({
            "Destination": {
              "ToAddresses": [
                element.email,
              ]
            },
            "ReplacementTemplateData": JSON.stringify({
              "name": element.name.split(" ")[0],
              "link": "https://docs.google.com/forms/d/e/1FAIpQLSehul00a34SEH-cZ0u8VoaR2H-xyFF3V-RACwlPurFQufKiMA/viewform?entry.1444202695=" + element.name + "&entry.369431247=" + encodeURIComponent(element.email)        })
          });
          console.log(element.email);
    
          minor_users.push(element);
        }
      }
    } catch(error) {
      console.log("Possibly invalid birthday: " + element.birthday + "\n" + error);
    }
    
  });

  fs.writeFileSync(mainFile, '');
  const csv1 = Papa.unparse(main_users);
  fs.appendFile(mainFile, csv1, err => {
    if (err) console.log(err);
  });

  fs.writeFileSync(minorsFile, '');
  const csv2 = Papa.unparse(minor_users);
  fs.appendFile(minorsFile, csv2, err => {
    if (err) console.log(err);
  });

  console.log("general: " + main_emails.length + ", minors: " + minor_emails.length);

  const chunkSize = 50;
  for (let i = 0; i < main_emails.length; i += chunkSize) {
    const chunk = main_emails.slice(i, i + chunkSize);

    const main_params = {
      Destinations: chunk,
      ConfigurationSetName: 'registration-2024',
      Source: 'hello@bit.camp', // required
      Template: "MainTemplate",
      DefaultTemplateData: JSON.stringify({
        "name": "Participant",
        "link": "https://docs.google.com/forms/d/e/1FAIpQLSehul00a34SEH-cZ0u8VoaR2H-xyFF3V-RACwlPurFQufKiMA/viewform?"
      }),
    };
    ses.sendBulkTemplatedEmail(main_params, (err, data) => {
      if (err) console.log(err, err.stack); // an error occurred
      else console.log(data); // successful response
    });
  }

  for (let i = 0; i < minor_emails.length; i += chunkSize) {
    const chunk = minor_emails.slice(i, i + chunkSize);

    const minor_params = {
      Destinations: chunk,
      ConfigurationSetName: 'registration-2024',
      Source: '"Bitcamp Team" <hello@bit.camp>', // required
      Template: "MinorTemplate",
      DefaultTemplateData: JSON.stringify({
        "name": "Participant",
        "link": "https://docs.google.com/forms/d/e/1FAIpQLSehul00a34SEH-cZ0u8VoaR2H-xyFF3V-RACwlPurFQufKiMA/viewform?"
      }),
    };
    ses.sendBulkTemplatedEmail(minor_params, (err, data) => {
      if (err) console.log(err, err.stack); // an error occurred
      else console.log(data); // successful response
    });
  }
})();
