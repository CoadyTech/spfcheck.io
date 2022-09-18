/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

let spfValidator = require("spf-validator");
let resultBool = null;

function getResult(hasRecords) {
    resultBool = hasRecords;
}

exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    let domainValidated = new spfValidator(event.domain);
    domainValidated.hasRecords((err, hasRecords) => getResult(hasRecords));
    console.log(resultBool);
    return {
        statusCode: 200,
      headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*"
      }, 
        body: JSON.stringify({spfEnabled: resultBool, spfOutput: "string", domain: event.domain}),
    };
};


