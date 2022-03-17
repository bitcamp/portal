const AWS = require('aws-sdk');
const Papa = require('papaparse');
const fs = require('fs');
const { time } = require('console');

AWS.config.update({ region: 'us-east-1' });

const documentClient = new AWS.DynamoDB.DocumentClient();

const STAGE_LIST = ['prd', 'stg', 'dev'];

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

    const fileName = `./portal-${stage}-registration.csv`;
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
    downloadRegistrations(stage);
});
