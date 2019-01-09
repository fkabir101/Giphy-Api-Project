// Declare initial variables
var queryArray = ["RWBY", "Rooster Teeth", "Achievement Hunter"];
var lastPressed;
var offset = 0;

// Run function initially to create buttons
createButton();

// function to create and recreate buttons
function createButton() {
  var buttonContainer = $("#buttons");
  buttonContainer.html("");
  for (var i = 0; i < queryArray.length; i++) {
    var button = $("<button>");
    button.text(queryArray[i]);
    button.attr("class", "query");
    buttonContainer.append(button);
  }
}

$(".query").on("click", function (event) {
  // Resets all images
  var search = $(this).text();

  if(lastPressed === search){
    limitMultiplier++;
  }

  else{
    $("#images").html("");
    limitMultiplier = 0;
  }
  var searchLimit = 10 * limitMultiplier;
  var queryUrl = `https://api.giphy.com/v1/gifs/search?q=${search}
  &api_key=ra70xorxvoPiBArlJQBpj3SmfmXSw2sX&limit=10&offset=${searchLimit}`;

  $.ajax({
    url: queryUrl,
    method: "GET"
  }).then(function (response) {
    console.log(response);
    for(var i = 0; i < response.data.length; i++){
      var imageUrl = response.data[i].images.fixed_height.url;
      var image = $("<img>");
      image.attr("src", imageUrl);
      $("#images").append(image);
    }
  });

  lastPressed = search;
});