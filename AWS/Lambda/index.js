const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient({region: "us-east-1"});

exports.handler = (event, context, callback) => {
    if(event.pathParameters.location) {
        let sp = {
            TableName: event.pathParameters.location,
            Limit: 100
        };
        docClient.scan(sp, (err, data) => {
           if(!err) {
               var items = data.Items;
               if(event.pathParameters.cuisine){
                   items = items.filter((item) => {
                       return item.cuisine === event.pathParameters.cuisine;
                   });
               }
               var item = items[Math.floor(Math.random()*items.length)];
               callback(null, {
                   "isBase64Encoded": event.isBase64Encoded,
                   "statusCode": 200,
                   "headers": {},
                   "body": JSON.stringify(item)
               });
           } else {
               callback(err, null);
           }
        });
    }
};
