var petFinderApiKey = "6MI42Rvs7RjJGQQTiwMErXRHg5hdT08iBt1zKyzysWnTt7BPzx"
var petFinderSecret = "qQWrLT0bSjdrEfmGEXO7xuBTx9SY5KdHCQ4v4GOf"
var theDogApiKey = "9af1f589-f293-4bba-8d9e-3ba9732efb0f"
var zipCode;
var distance;

// Function to call the Petfinder API
function callPetFinder() {

  // To be defined when function is called with input fields on html
  // zipCode = ;
  // distance = ;

  // Fetch code referenced from https://gomakethings.com/using-oauth-with-fetch-in-vanilla-js/
  // Fetch to retrieve the Petfinder authorization tokens
  fetch('https://api.petfinder.com/v2/oauth2/token', {
    method: 'POST',
    body: 'grant_type=client_credentials&client_id=' + petFinderApiKey + '&client_secret=' + petFinderSecret,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then(function (response) {

    // Return the Petfinder authorization tokens
    return response.json();

  }).then(function (tokenData) {

    // Uses the returned authorization tokens to fetch Petfinder's API
    return fetch('https://api.petfinder.com/v2/animals?type=dog&location=' + zipCode + '&distance=' + distance, {
      headers: {
        'Authorization': tokenData.token_type + ' ' + tokenData.access_token,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

  }).then(function(response){

	  // Return the API response as JSON
	  return response.json();

  }).then(function (petData) {

    // Log the pet data
    console.log('pets', petData);
  });
}
