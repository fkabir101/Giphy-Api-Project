var search = "rwby"
var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" +
        search + "&api_key=ra70xorxvoPiBArlJQBpj3SmfmXSw2sX&limit=10";
$.ajax({
  url: queryUrl,
  limit: 10,
  method: "GET"
}).then(function(response) {
  console.log(response);
  var imageUrl = response.data[0].images.fixed_height.url;
  $("#images").html("<img src="+imageUrl+">");
});