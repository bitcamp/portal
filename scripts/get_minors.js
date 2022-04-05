const AWS = require('aws-sdk');
const Papa = require('papaparse');
const fs = require('fs');

AWS.config.update({ region: 'us-east-1' });

const documentClient = new AWS.DynamoDB.DocumentClient();

const STAGE_LIST = ['prd'];

function sleep(ms) {
     return new Promise((resolve) => {
        setTimeout(resolve, ms)
    })
}

const getMinors = async (stage) => {
    const fullTableName = `portal-${stage}-registration`;
    let params = {
        TableName: fullTableName,
        FilterExpression : 'birthday > :bitcamp_minor_date',
        ExpressionAttributeValues : {':bitcamp_minor_date' : '2004-04-08'},
        ProjectionExpression: 'email, #name, birthday',
        ExpressionAttributeNames: {'#name': 'name'},
    };

    const fileName = `./portal-${stage}-minors.csv`;
    // First, we delete the csv file that might exist already
    fs.writeFileSync(fileName, '');

    // We'll be looping through repeatedly, appending
    done = false;
    do {
    documentClient.scan(params, (err, data) => {
        if (err) console.log(err);
        else {
            const csv = Papa.unparse(data.Items);
            fs.appendFile(fileName, csv, err => {
                if (err) console.log(err);
            });
        }
        // If we reached the 1MB limit, we scan some more with the old startKey
        if ( typeof data.LastEvalutedKey !== 'undefined') {
            params.ExclusiveStartKey = data.LastEvalutedKey;
        } else {
            done = true;
        }
    });
    await sleep(1000)
    } while(!done);
};

STAGE_LIST.forEach((stage) => {
    getMinors(stage);
});
