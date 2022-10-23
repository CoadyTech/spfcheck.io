/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
let spfValidator = require("spf-validator");

function spfCheck(domainValidated) {
  return new Promise((resolve, reject) => {
    domainValidated.hasRecords((err, hasRecords) => {
      if (err) {
        reject(err);
      } else {
        resolve(hasRecords);
      }
    });
  });
}

exports.handler = async (event) => {
  let jsonbody = JSON.parse(event.body);
  let domainValidated = await new spfValidator(jsonbody.domain);
  let resultBool = await spfCheck(domainValidated);
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
    },
    body: JSON.stringify({
      spfEnabled: resultBool,
      spfOutput: "string",
      domain: jsonbody.domain,
    }),
  };
};
