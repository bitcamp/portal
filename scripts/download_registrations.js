const AWS = require('aws-sdk');
const Papa = require('papaparse');
const fs = require('fs');

AWS.config.update({ region: 'us-east-1' });

const documentClient = new AWS.DynamoDB.DocumentClient();

const STAGE_LIST = ['prd', 'stg', 'dev'];

const downloadRegistrations = (stage) => {
    const fullTableName = `portal-${stage}-registration`;
    const params = {
        TableName: fullTableName,
    };
    
    documentClient.scan(params, (err, data) => {
        if (err) console.log(err);
        else {
            const csv = Papa.unparse(data.Items);
            fs.writeFile(`./portal-${stage}-registrations.csv`, csv, err => {
                if (err) console.log(err);
            });
        }
    });
};

STAGE_LIST.forEach((stage) => {
    downloadRegistrations(stage);
});
