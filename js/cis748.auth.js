//set scope
// var scopes = 'https://www.googleapis.com/auth/plus.me https://www.googleapis.com/auth/userinfo.email';
var scopes = 'openid profile email phone'

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

function getUserInfo () {
  var request = gapi.client.oauth2.userinfo.get();
  request.execute(handleAuthorized);
}

function loadOAuthAPI() {
  gapi.client.load("oauth2", "v1", getUserInfo);
}

function handleAuthResult(authResult) {
  if (authResult) {
    // The user has authorized access

    console.log(authResult.status);

    loadOAuthAPI();

  } else {
    // User has not Authenticated and Authorized
    handleUnAuthorized();
  }
}

// Authorized user
function handleAuthorized(userInfo) {
    console.log("handleAuthorized");

    // display happy chuck
    $('#chuckHappy').show();
    $('#chuckNotHappy').hide();

    // display logout button
    $('#logout-button').show();
    $('#authorize-button').hide();

    console.log(userInfo.email);
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
