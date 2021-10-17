const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();
exports.handler = async (event) => {
    const params = {
        TableName: process.env.MY_TABLE,
        Item: JSON.parse(event.body),
    };
    try {
        await docClient.put(params).promise();
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
            },
            body: event.body,
        };
    }
    catch (err) {
        return {
            statusCode: 400,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
            },
            body: JSON.stringify(err),
        };
    }
};