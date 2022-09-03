/* Check if JSON input is a valid domain */ 
function domainInputValidator(domain) { 
    var re = new RegExp(/^((?:(?:(?:\w[\.\-\+]?)*)\w)+)((?:(?:(?:\w[\.\-\+]?){0,62})\w)+)\.(\w{2,6})$/); 
    return domain.match(re);
} 

/* Dump domain to the log and then call vewportOutput for DOM inject */
async function domainSpfCheckApi(domainToCheck) {
        const rawResponse = await fetch('https://8yrro8ap61.execute-api.eu-west-2.amazonaws.com/v1', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ domain: domainToCheck })
        });
        const content = await rawResponse.json();
        return content;
      };

/* Logic for DOM injecttion */
function domainResultDomManipulator(domainResultJson) {
    if (domainResultJson.spfEnabled) {
        let domainResult = document.createElement('p');
        domainResult.id = 'domain-result-success';
        domainResult.innerHTML = `Good news! SPF is enabled for <strong>${domainResultJson.domain}</strong>`;
        document.getElementById('domain-result').appendChild(domainResult);
        let domainResultRaw = document.createElement('p');
        domainResultRaw.id = 'domain-result-spfrecord';
        domainResultRaw.innerHTML = (domainResultJson.spfOutput);
        document.getElementById('domain-result').appendChild(domainResultRaw);
    } else {
        domainResult.id = 'domain-result-fail';
        domainResult.innerHTML = `SPF is not enabled for <strong>${domainResultJson.domain}</strong>`;
        document.getElementById('domain-result').appendChild(domainResult);
    }
}

async function spfCheck() {
    let domainToCheck = document.getElementById("domain-name").value;
    if (domainInputValidator(domainToCheck)) {
        let domainResultJson = await domainSpfCheckApi(domainToCheck);
        domainResultDomManipulator(domainResultJson);
    } else {
            alert("Please enter a valid domain name.");
    }
}

/* Event listener for submit button press. Calls function domainSubmit */
let btn = document.getElementById("domain-submit");
btn.addEventListener('click', spfCheck);

