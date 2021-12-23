var petFinderApiKey = "6MI42Rvs7RjJGQQTiwMErXRHg5hdT08iBt1zKyzysWnTt7BPzx";
var petFinderSecret = "qQWrLT0bSjdrEfmGEXO7xuBTx9SY5KdHCQ4v4GOf";
var theDogApiKey = "9af1f589-f293-4bba-8d9e-3ba9732efb0f";
var breedTextBox = document.getElementById("breed")
var zipCode = document.getElementById('zip');
var distance = document.getElementById('distance');
var selectedImage = document.getElementById('selectedImage');
var selectedName = document.getElementById('selectedName');
var selectedBreed = document.getElementById('selectedBreed');
var selectedTraits = document.getElementById('selectedTraits');
var selectedLifespan = document.getElementById('selectedLifespan');
var selectedURL = document.getElementById('selectedURL');
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

  dogListing.innerHTML = "";

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

    // For loop creates a new dog card for each dog (1 page is up to 20 dogs)
    for (var i = 0; i < petData.animals.length; i++) {
      var newDogCard = document.createElement('article');
      var newCardImg = document.createElement('img');
      var newNameEl = document.createElement('h3');
      var dogImageOutput = petData.animals[i].primary_photo_cropped;
      var dogNameOutput = petData.animals[i].name;
      var dogBreedOutput = petData.animals[i].breeds.primary;
      var dogGenderOutput = petData.animals[i].gender;
      var dogAgeOutput = petData.animals[i].age;
      var dogUrlOutput = petData.animals[i].url;

      // Adds new elements, classes, and values for dog card container, image, and name
      dogListing.appendChild(newDogCard);
      dogListing.children[i].setAttribute('class', 'card dogCard');
      dogListing.children[i].addEventListener('click', individualCardClick);
      dogCard[i].appendChild(newCardImg);
      dogCard[i].children[0].setAttribute('class', 'section media dogImage');

      if (dogImageOutput == null) {
        dogImage[i].src = '';
        dogImage[i].alt = 'Photo unavailable';
      } else {
        dogImage[i].src = dogImageOutput.full;
      }

      dogCard[i].appendChild(newNameEl);
      dogCard[i].children[1].setAttribute('class', 'section double-padded dogName');
      dogName[i].innerHTML = 'Name: ' + dogNameOutput;

      // Adds 4 new p elements
      for (var j = 0; j < 4; j++) {
        var newPEl = document.createElement('p');
        dogCard[i].appendChild(newPEl);
      }

      // Sets class and value for the p tags
      dogCard[i].children[2].setAttribute('class', 'section single-padded dogBreed')
      dogBreed[i].innerHTML = 'Breed: ' + dogBreedOutput;
      dogCard[i].children[3].setAttribute('class', 'section single-padded dogGender')
      dogGender[i].innerHTML = 'Gender: ' + dogGenderOutput;
      dogCard[i].children[4].setAttribute('class', 'section single-padded dogAge')
      dogAge[i].innerHTML = 'Age: ' + dogAgeOutput;
      dogCard[i].children[5].setAttribute('class', 'section single-padded dogUrl hidden')
      dogUrl[i].innerHTML = dogUrlOutput;
    }
  });
}

function getBreedInfo(currentBreed){
  // Needs function to replace spaces in breed name with + symbols
  var Url = "https://api.thedogapi.com/v1/breeds/search?q=" + currentBreed
    fetch(Url, {
      headers:{
        "x-api-key": theDogApiKey
      }
    }).then(function(response){
    //   console.log(response.json());
      return response.json()
    }).then(function(dataJson){
      console.log(dataJson)

      // Get image, name, and breed from selected card
      // var imageEl = ;
    //   var nameEl = ;
      // var breedEl = ;
      if(currentBreed == "Mixed+Breed") {
        var temperamentEl = 'No temperament information available';
        var lifeSpanEl = 'No life span information available';
      } else {
        var temperamentEl = dataJson[0].temperament;
        var lifeSpanEl = dataJson[0].life_span;
      }

            // Get url from the hidden element from selected card
      // var urlEl = ;

      // selectedImage.src = imageEl;
      // selectedName.innerHTML = nameEl;
      // selectedBreed.innerHTML = 'Breed: ' + breedEl;
      selectedTraits.innerHTML = 'Traits: ' + temperamentEl;
      selectedLifespan.innerHTML = 'Typical Life Span: ' + lifeSpanEl;
      // selectedURL.href = urlEl;
    });
}


// Test event listener and function for getting specific card info
var individualCardClick = function(event) {
  var dogCardValues = event.currentTarget;
  console.log(dogCardValues.children[2].textContent);
  var currentBreed = dogCardValues.children[2].textContent
  currentBreed = currentBreed.replace('Breed: ', '')
  console.log(currentBreed)
    // var imageEl = ;
    // var nameEl = ;
    // var breedEl = ;
    // var urlEl = ;
  getBreedInfo(currentBreed)



};

