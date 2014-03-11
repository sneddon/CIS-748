//set scope
var scopes = 'https://www.googleapis.com/auth/analytics.readonly';

// This function is called after the Client Library has finished loading
function handleClientLoad() {
  // 1. Set the API Key
  gapi.client.setApiKey(apiKey);

  // 2. Call the function that checks if the user is Authenticated. This is defined in the next section
  window.setTimeout(checkAuth,1);
}

function checkAuth() {
  // Call the Google Accounts Service to determine the current user's auth status.
  // Pass the response to the handleAuthResult callback function
  gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true}, handleAuthResult);
}

function handleAuthResult(authResult) {
  if (authResult) {
    // The user has authorized access

    console.log(authResult.status);

    handleAuthorized();

  } else {
    // User has not Authenticated and Authorized
    handleUnAuthorized();
  }
}

// Authorized user
function handleAuthorized() {
    // $("#authorize-button").addClass("hide");
    // $("#test-api").removeClass("hide");
    console.log("handleAuthorized");
}

// Unauthorized user
function handleUnAuthorized() {
    // $("#authorize-button").removeClass("hide");
    // $("#test-api").addClass("hide");
    console.log("handleUnAuthorized");
}


$("#authorize-button").on("click", function (e){
  gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: false}, handleAuthResult);
  return false;
});

$("#test-api").on("click", function(e) {
    makeApiCall();
});
