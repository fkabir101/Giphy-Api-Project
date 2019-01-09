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
    button.addClass("query");
    buttonContainer.append(button);
  }
}

$(".query").on("click", function () {
  // Resets all images
  var search = $(this).text();

  if(lastPressed === search){
    offset++;
  }

  else{
    $("#images").html("");
    offset = 0;
  }
  var searchOffset = 10 * offset;
  var queryUrl = `https://api.giphy.com/v1/gifs/search?q=${search}
  &api_key=ra70xorxvoPiBArlJQBpj3SmfmXSw2sX&limit=10&offset=${searchOffset}`;

  $.ajax({
    url: queryUrl,
    method: "GET"
  }).then(function (response) {
    //console.log(response);
    for(var i = 0; i < response.data.length; i++){
      var imageAnimate = response.data[i].images.fixed_height.url;
      var imageStill = response.data[i].images.fixed_height_still.url
      var image = $("<img>");
      image.addClass("gif");
      image.attr({
        src: imageStill, 
        animateRef: imageAnimate,
        stillRef: imageStill,
        state: "still"
      });
      $("#images").append(image);
    }
  });

  lastPressed = search;
});

$("#images").on("click", ".gif",function(){
  var stillSource = $(this).attr("stillRef");
  var animateSource = $(this).attr("animateRef");
  if($(this).attr("state") === "still"){
    $(this).attr("src", animateSource);
    $(this).attr("state", "animate");
  }
  else{
    $(this).attr("src", stillSource);
    $(this).attr("state", "still");
  }
});
