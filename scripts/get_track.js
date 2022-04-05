const AWS = require('aws-sdk');
const Papa = require('papaparse');
const fs = require('fs');

AWS.config.update({ region: 'us-east-1' });

const documentClient = new AWS.DynamoDB.DocumentClient();

const TRACKS_LIST = ['quantum'];

function sleep(ms) {
     return new Promise((resolve) => {
        setTimeout(resolve, ms)
    })
}

const getTrack = async (track) => {
    const fullTableName = 'portal-prd-registration';
    let params = {
        TableName: fullTableName,
        FilterExpression : 'track = :selected_track',
        ExpressionAttributeValues : {':selected_track' : track},
        ProjectionExpression: 'email, #name, school, school_year',
        ExpressionAttributeNames: {'#name': 'name'},
    };

    const fileName = `./portal-prd-${track}.csv`;
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

TRACKS_LIST.forEach((track) => {
    getTrack(track);
});
