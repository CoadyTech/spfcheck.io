let domainResultJson = null;

/* Check if JSON input is a valid domain */
function domainInputValidator(domain) {
  var re = new RegExp(
    /^((?:(?:(?:\w[\.\-\+]?)*)\w)+)((?:(?:(?:\w[\.\-\+]?){0,62})\w)+)\.(\w{2,6})$/
  );
  return domain.match(re);
}

let jsonPromise = null;

/* Dump domain to the log and then call vewportOutput for DOM inject */
async function domainSpfCheckApi(domainToCheck) {
  document.getElementById("loader").style.display = "block";
  const rawResponse = fetch(
    "https://cqi25h9ctk.execute-api.eu-west-2.amazonaws.com/main",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ domain: domainToCheck }),
    }
  );

  await rawResponse
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      domainResultJson = data;
    })
    .catch((error) => {
      console.error(`Could not get SPF record: ${error}`);
    });

  document.getElementById("loader").style.display = "none";
}

/* Logic for DOM injection */
function domainResultDomManipulator(domainResultJson) {
  document.getElementById("domain-result-success")?.remove();
  document.getElementById("domain-result-spfrecord")?.remove();
  document.getElementById("domain-result-fail")?.remove();
  let domainResult = document.createElement("p");
  if (domainResultJson.spfEnabled) {
    document.getElementById("domain-result-success")?.remove();
    document.getElementById("domain-result-spfrecord")?.remove();
    domainResult.id = "domain-result-success";
    domainResult.innerHTML = `Good news! SPF is enabled for <strong>${domainResultJson.domain}</strong>`;
    document.getElementById("domain-result").appendChild(domainResult);
    let domainResultRaw = document.createElement("p");
    domainResultRaw.id = "domain-result-spfrecord";
    domainResultRaw.innerHTML = domainResultJson.spfOutput;
    document.getElementById("domain-result").appendChild(domainResultRaw);
  } else {
    document.getElementById("domain-result-fail")?.remove();
    domainResult.id = "domain-result-fail";
    domainResult.innerHTML = `SPF is not enabled for <strong>${domainResultJson.domain}</strong>`;
    document.getElementById("domain-result").appendChild(domainResult);
  }
}

async function spfCheck() {
  let domainToCheck = document.getElementById("domain-name").value;
  if (domainInputValidator(domainToCheck)) {
    await domainSpfCheckApi(domainToCheck);
    domainResultDomManipulator(domainResultJson);
  } else {
    alert("Please enter a valid domain name.");
  }
}

/* Event listener for submit button press. Calls function domainSubmit */
let btn = document.getElementById("domain-submit");
btn.addEventListener("click", spfCheck);
