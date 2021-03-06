var AWS = require("aws-sdk"); //aws-sdk 사용
var documentClient = new AWS.DynamoDB.DocumentClient({
  apiVersion: "2012-08-10",
}); //DynamoDB 사용
const tableName = "Cards";

exports.handler = async (event) => {
  console.log("Received: " + JSON.stringify(event, null, 2)); //couldwatch 상에서 전달받은 데이터를 확인하기 위함
  let response = "";
  try {
    var params = {
      TableName: tableName,
    };
    const cards = await documentClient.scan(params).promise(); //promise 콜백을 사용하지 않음 (?)이 부분 잘 모르겠음

    response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(cards), // ???
    };
  } catch (exception) {
    console.error(exception);
    response = {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ "Message: ": exception }),
    };
  }
  return response;
};
