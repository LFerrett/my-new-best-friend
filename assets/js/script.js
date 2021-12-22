var petFinderApiKey = "6MI42Rvs7RjJGQQTiwMErXRHg5hdT08iBt1zKyzysWnTt7BPzx"
var theDogApiKey = "9af1f589-f293-4bba-8d9e-3ba9732efb0f"
var breedTextBox = document.getElementById("breed")
function getBreedInfo(){
    var Url = "https://api.thedogapi.com/v1/breeds" + theDogApiKey
        fetch(Url).then(function(data){
            console.log(response.data);
        });

        
}    