// Declare initial variables
var queryArray = ["RWBY", "Rooster Teeth", "Achievement Hunter"];

// Run function initially to create buttons
createButton();

// function to create and recreate buttons
function createButton() {
  var buttonContainer = $("#buttons");
  buttonContainer.html("");
  for (var i = 0; i < queryArray.length; i++) {
    var button = $("<button>");
    button.text(queryArray[i]);
    buttonContainer.append(button);
  }
}

$("button").on("click", function (event) {
  var search = $(this).text();
  var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" +
    search + "&api_key=ra70xorxvoPiBArlJQBpj3SmfmXSw2sX&limit=10";
  $.ajax({
    url: queryUrl,
    limit: 15,
    method: "GET"
  }).then(function (response) {
    console.log(response);
    var imageUrl = response.data[0].images.fixed_height.url;
    $("#images").html("<img src=" + imageUrl + ">");
  });
});