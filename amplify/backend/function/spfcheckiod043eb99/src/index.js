const dns = require("dns");
const { promisify } = require("util");
const dnsResolve = promisify(dns.resolveTxt);
const validator = require("validator");

function spfCheck(domain) {
  return dnsResolve(domain)
    .then((records) => {
      let spfRecords = records.filter((record) =>
        record[0].startsWith("v=spf1")
      );
      return spfRecords.length > 0 ? spfRecords[0].join(" ") : "";
    })
    .catch(() => "");
}

function inputValidator(domain) {
  let options = {
    require_tld: false,
    allow_underscores: false,
    allow_trailing_dot: true,
    allow_numeric_tld: false,
    allow_wildcard: false,
  };
  return validator.isFQDN(domain, options);
}

exports.handler = async (event) => {
  let jsonbody = JSON.parse(event.body);
  if (inputValidator(jsonbody.domain)) {
    let spfOutput = await spfCheck(jsonbody.domain);
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
      body: JSON.stringify({
        spfEnabled: spfOutput !== "",
        spfOutput: spfOutput,
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
    };
  }
};
