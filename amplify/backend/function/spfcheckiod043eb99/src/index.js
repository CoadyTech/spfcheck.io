/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
let spfValidator = require("spf-validator");
let validator = require('validator');

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

function inputValidator(domain) {
  let options = { require_tld: false, allow_underscores: false, allow_trailing_dot: true, allow_numeric_tld: false, allow_wildcard: false };
  return validator.isFQDN(domain, options);
}

exports.handler = async (event) => {
  let jsonbody = JSON.parse(event.body);
  if (inputValidator(jsonbody.domain)) {
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
  } else {
    return {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
      body: JSON.stringify({
        error: "Invalid domain or syntax.",
      }),
    }
  };


};
