var AWS = require("aws-sdk");
var documentClient = new AWS.DynamoDB.DocumentClient({
  apiVersion: "2012-08-10"
});
const tableName = "Cards";

exports.handler = async event => {
  console.log("Received: " + JSON.stringify(event, null, 2));
  let response = "";
  try {
    const id = event.requestContext.requestId; // id를 받아오는 대신 requestId값을 사용
    const body = JSON.parse(event.body); //람다에서 전달 올 때는 String타입이므로 다시 JSON으로 변환
    var params = {
      TableName: tableName,
      Item: {
        id: id,
        title: body.title,
        category: body.category
      }
    };
    await documentClient.put(params).promise(); //DB에 put

    response = {
      statusCode: 200,
      body: JSON.stringify({ id: id })
    };
  } catch (exception) {
    console.error(exception);
    response = {
      statusCode: 500,
      body: JSON.stringify({ "Message: ": exception })
    };
  }
  return response;
};
