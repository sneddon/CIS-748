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
    console.log("handleAuthorized");

    // display happy chuck
    $('#chuckHappy').show();
    $('#chuckNotHappy').hide();

    // display logout button
    $('#logout-button').show();
    $('#authorize-button').hide();
}

// Unauthorized user
function handleUnAuthorized() {
    console.log("handleUnAuthorized");

    // display happy chuck
    $('#chuckHappy').hide();
    $('#chuckNotHappy').show();

    // display logout button
    $('#logout-button').hide();
    $('#authorize-button').show();

}


$("#authorize-button").on("click", function (e){
  gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: false}, handleAuthResult);
  return false;
});
