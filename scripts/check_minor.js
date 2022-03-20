const AWS = require('aws-sdk');

AWS.config.update({ region: 'us-east-1' });
const ses = new AWS.SES();
const ddb = new AWS.DynamoDB.DocumentClient();

const fs = require('fs');

let template = fs.readFileSync('../users/email_template.html', 'utf8');
// template = template.replace('{header text}',);
let main_template = template.replace('{body text}', `<div style='display: flex; justify-content: center'><img src='https://bitcamp-assets.s3.amazonaws.com/bitcamp.png' width='722px' height='150px'></div> 
<br/><br/>Hey Mackenzie, thanks for registering for Bitcamp 2021! 
<br /><br />Here's your custom referral link - you can win prizes and swag by having your friends use it to register for Bitcamp as well! 
<br /><br />http://gotechnica.org/r?r=389bb 
<br /><br />If you have any questions, just reply to this email. <br /><br />Best, The Bitcamp Organizing Team", /* required */`);

let minor_template = template.replace('{body text}', `<div style='display: flex; justify-content: center'><img src='https://bitcamp-assets.s3.amazonaws.com/bitcamp.png' width='722px' height='150px'></div> 
<br/><br/>Hey Mackenzie, thanks for registering for Bitcamp 2021! 
<br /><br />Here's your custom referral link - you can win prizes and swag by having your friends use it to register for Bitcamp as well! 
<br /><br />http://gotechnica.org/r?r=389bb 
<br /><br />If you have any questions, just reply to this email. <br /><br />Best, The Bitcamp Organizing Team", /* required */`);

// NOTE: does this work the same way in a script?
const scan_params = {
  TableName: 'platform-prd-registration',
};

const result = (await ddb.scan(scan_params).promise()).Items;

// if you're 18 by the first day of bitcamp that means you were born <= Apr 8 2004
// monthIndex for April is 3
let cutoff = new Date(2004, 3, 8);
result.forEach(element => {
  const params = {
    Destination: { /* required */
      ToAddresses: [
        element.email,
      ],
    },
    Message: { /* required */
      Body: { /* required */
        Html: {
          Data: (element.birthday < cutoff ? main_template : minor_template),
        },
      },
      Subject: { /* required */
        Data: "You're Registered for Bitcamp 2021! Now Refer Your Friends...", /* required */
      },
    },
    ConfigurationSetName: 'platform_prod',
    Source: 'hello@bit.camp', /* required */
  };
  ses.sendEmail(params, (err, data) => {
    if (err) console.log(err, err.stack); // an error occurred
    else console.log(data); // successful response
  });
});


