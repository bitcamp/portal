const AWS = require('aws-sdk');
const Papa = require('papaparse');
const fs = require('fs');
const { time, Console } = require('console');

AWS.config.update({ region: 'us-east-1' });

const documentClient = new AWS.DynamoDB.DocumentClient();

// scan stages one at a time, multiple stages can cause errors with rate limiting
// const STAGE_LIST = ['prd', 'stg', 'dev'];
const STAGE_LIST = ['prd'];

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
    let count = 0;
    do {
        await documentClient.scan(params, (err, data) => {
            if (err) console.log(err);
            else {
                const csv = Papa.unparse(data.Items);
                count += data.Items.length;
                fs.appendFile(fileName, csv, err => {
                    if (err) console.log(err);
                });
            }
            // If we reached the 1MB limit, we scan some more with the old startKey
            if ( typeof data.LastEvaluatedKey != 'undefined') {
                params.ExclusiveStartKey = data.LastEvaluatedKey;
            } else {
                done = true;
            }
        });
        await sleep(5000)
    } while(!done);

    console.log(count);
};

STAGE_LIST.forEach((stage) => {
    downloadRegistrations(stage);
});
