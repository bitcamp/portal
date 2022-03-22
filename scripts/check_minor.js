const AWS = require('aws-sdk');

AWS.config.update({ region: 'us-east-1' });
const ses = new AWS.SES();
const ddb = new AWS.DynamoDB.DocumentClient();

// const fs = require('fs');

// let template = fs.readFileSync('../users/email_template.html', 'utf8');
// template = template.replace('{header text}',);
let main_template = {
  Template: {
    TemplateName: "MainTemplate",
    SubjectPart: "You're Registered for Bitcamp 2021! Now Refer Your Friends...",
    TextPart: `Hey {{name}}, thanks for registering for Bitcamp 2021! 
    \n\nHere's your custom referral link - you can win prizes and swag by having your friends use it to register for Bitcamp as well! 
    \n\nhttp://gotechnica.org/r?r=389bb 
    \n\nIf you have any questions, just reply to this email.
    \n\nBest, The Bitcamp Organizing Team`,
    HtmlPart: `<div style='display: flex; justify-content: center'><img src='https://bitcamp-assets.s3.amazonaws.com/bitcamp.png' width='722px' height='150px'></div> 
    <br/><br/>Hey {{name}}, thanks for registering for Bitcamp 2021! 
    <br /><br />Here's your custom referral link - you can win prizes and swag by having your friends use it to register for Bitcamp as well! 
    <br /><br />http://gotechnica.org/r?r=389bb 
    <br /><br />If you have any questions, just reply to this email. <br /><br />Best, The Bitcamp Organizing Team`
  }
};

let minor_template = {
  Template: {
    TemplateName: "MinorTemplate",
    SubjectPart: "You're Registered for Bitcamp 2021! Now Refer Your Friends...",
    TextPart: `Hey {{name}}, thanks for registering for Bitcamp 2021! 
    \n\nHere's your custom referral link - you can win prizes and swag by having your friends use it to register for Bitcamp as well! 
    \n\nhttp://gotechnica.org/r?r=389bb 
    \n\nIf you have any questions, just reply to this email.
    \n\nBest, The Bitcamp Organizing Team`,
    HtmlPart: `<div style='display: flex; justify-content: center'><img src='https://bitcamp-assets.s3.amazonaws.com/bitcamp.png' width='722px' height='150px'></div> 
    <br/><br/>Hey {{name}}, thanks for registering for Bitcamp 2021! 
    <br /><br />Here's your custom referral link - you can win prizes and swag by having your friends use it to register for Bitcamp as well! 
    <br /><br />http://gotechnica.org/r?r=389bb 
    <br /><br />If you have any questions, just reply to this email. <br /><br />Best, The Bitcamp Organizing Team`
  }
};

(async function () {
  var templatePromise1 = await ses.createTemplate(main_template).promise();

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

  var templatePromise2 = await ses.createTemplate(minor_template).promise();

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
let cutoff = new Date(2004, 3, 8);

const scan_params = {
  TableName: 'portal-prd-registration',
};

let main_emails = [];
let minor_emails = [];

(async function () {
  const result = await ddb.scan(scan_params).promise();

  result.Items.forEach(element => {
    if (new Date(element.birthday) < cutoff) {
      main_emails.push({
        "Destination": {
          "ToAddresses": [
            element.email,
          ]
        },
        "ReplacementTemplateData": "{ \"name\":\"" + element.name + "\"}"
      });
    } else {
      minor_emails.push({
        "Destination": {
          "ToAddresses": [
            element.email,
          ]
        },
        "ReplacementTemplateData": "{ \"name\":\"" + element.name + "\"}"
      });
    }
  });

  const main_params = {
    Destinations: [
      main_emails,
    ],
    ConfigurationSetName: 'platform_prod',
    Source: 'hello@bit.camp', /* required */
    Template: "MainTemplate",
    DefaultTemplateData: '{ \"name\":\"Participant\" }',
  };
  ses.sendBulkTemplatedEmail(main_params, (err, data) => {
    if (err) console.log(err, err.stack); // an error occurred
    else console.log(data); // successful response
  });

  const minor_params = {
    Destinations: [
      minor_emails,
    ],
    ConfigurationSetName: 'platform_prod',
    Source: 'hello@bit.camp', /* required */
    Template: "MinorTemplate",
    DefaultTemplateData: '{ \"name\":\"BitCamp Participant\" }',
  };
  ses.sendBulkTemplatedEmail(minor_params, (err, data) => {
    if (err) console.log(err, err.stack); // an error occurred
    else console.log(data); // successful response
  });

})();
