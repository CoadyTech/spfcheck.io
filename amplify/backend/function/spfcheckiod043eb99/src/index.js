/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

 let spfValidator = require("spf-validator");
 let resultBool = null;
 
 function getResult(hasRecords) {
     resultBool = hasRecords;
 }
 
 exports.handler = async (event) => {
     let jsonbody = JSON.parse(event.body);
     let domainValidated = new spfValidator(jsonbody.domain);
     await domainValidated.hasRecords((err, hasRecords) => getResult(hasRecords));
     return {
         statusCode: 200,
       headers: {
           "Access-Control-Allow-Origin": "*",
           "Access-Control-Allow-Headers": "*"
       }, 
         body: JSON.stringify({spfEnabled: resultBool, spfOutput: "string", domain: jsonbody.domain}),
     };
 };