var petFinderApiKey = "6MI42Rvs7RjJGQQTiwMErXRHg5hdT08iBt1zKyzysWnTt7BPzx";
var petFinderSecret = "qQWrLT0bSjdrEfmGEXO7xuBTx9SY5KdHCQ4v4GOf";
var theDogApiKey = "9af1f589-f293-4bba-8d9e-3ba9732efb0f";
var breedTextBox = document.getElementById("breed")
var zipCode = document.getElementById('zip');
var distance = document.getElementById('distance');
var dogImage = document.getElementsByClassName('dogImage');
var dogName = document.getElementsByClassName('dogName');
var dogBreed = document.getElementsByClassName('dogBreed');
var dogGender = document.getElementsByClassName('dogGender');
var dogAge = document.getElementsByClassName('dogAge');
var dogUrl = document.getElementsByClassName('dogUrl');
var dogListing = document.getElementById('dogListing');
var dogCard = document.getElementsByClassName('dogCard');

// Function to call the Petfinder API
function callPetFinder() {

  // Sets default zip code to Philadelphia if nothing is input
  var zipCodeValue = zipCode.value;
  if (zipCodeValue == "") {
    zipCodeValue = 19106;
  }

  // Sets distance to 100 miles if the any distance option is selected
  var distanceValue = distance.options[distance.selectedIndex].value;
  if (distanceValue == "any") {
    distanceValue = 100;
  } else (
    distanceValue = parseInt(distance.options[distance.selectedIndex].value)
  )

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
    return fetch('https://api.petfinder.com/v2/animals?type=dog&location=' + zipCodeValue + '&distance=' + distanceValue, {
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
    // Replace [0] with [i] once testing is done
    var dogImageOutput = petData.animals[0].primary_photo_cropped.full
    console.log(dogImageOutput)
    var dogNameOutput = petData.animals[0].name
    var dogBreedOutput = petData.animals[0].breeds.primary
    var dogGenderOutput = petData.animals[0].gender
    var dogAgeOutput = petData.animals[0].age
    var dogUrlOutput = petData.animals[0].url

    // dogImage[0].setAttribute('src', dogImageOutput);
    // dogName[0].innerHTML = 'Name: ' + dogNameOutput;
    // dogBreed[0].innerHTML = 'Breed: ' + dogBreedOutput;
    // dogGender[0].innerHTML = 'Gender: ' + dogGenderOutput;
    // dogAge[0].innerHTML = 'Age: ' + dogAgeOutput;
    // dogUrl[0].innerHTML = dogUrlOutput;
    // console.log('pets', petData);

    // Test code for creation of new dog card in order from top to bottom
    // After running test, organize code and create for loop, replace [0] with [i], do not replace bracket number for children except for the dogListing children
    var newDogCard = document.createElement('article');
    dogListing.appendChild(newDogCard);
    dogListing.children[0].setAttribute('class', 'card dogCard');
    var newCardImg = document.createElement('img');
    dogCard[0].appendChild(newCardImg);
    dogCard[0].children[0].setAttribute('class', 'section media dogImage');
    dogImage[0].src = dogImageOutput;
    var newNameEl = document.createElement('h3');
    dogCard[0].appendChild(newNameEl);
    dogCard[0].children[1].setAttribute('class', 'section double-padded dogName');
    dogName[0].innerHTML = 'Name: ' + dogNameOutput;

    // For loop for creating the 4 p elements, to be kept inside the general dog card for loop
    for (var j = 0; j < 4; j++) {
      var newPEl = document.createElement('p');
      dogCard[0].appendChild(newPEl);
    }

    dogCard[0].children[2].setAttribute('class', 'section single-padded dogBreed')
    dogBreed[0].innerHTML = 'Breed: ' + dogBreedOutput;
    dogCard[0].children[3].setAttribute('class', 'section single-padded dogGender')
    dogGender[0].innerHTML = 'Gender: ' + dogGenderOutput;
    dogCard[0].children[4].setAttribute('class', 'section single-padded dogAge')
    dogAge[0].innerHTML = 'Age: ' + dogAgeOutput;
    dogCard[0].children[5].setAttribute('class', 'section single-padded dogUrl hidden')
    dogUrl[0].innerHTML = dogUrlOutput;
  });
}

function getBreedInfo(){
  var Url = "https://api.thedogapi.com/v1/breeds/search?q=golden"
    fetch(Url, {
      headers:{
        "x-api-key": theDogApiKey
      }
    }).then(function(response){
    //   console.log(response.json());
      return response.json()
    }).then(function(dataJson){
      console.log(dataJson)
      var dogInfoEl = document.getElementById("dogInfo")
      var temperamentEl = document.getElementById("temperament")
      var breedGroupEl = document.getElementById("breedGroup")
      var lifeSpanEl = document.getElementById("lifeSpan")

    });
}
getBreedInfo()
