
    
  //api key AIzaSyCsKTmPxVHUp9o0kXMu5_gkI2XQU1ohWIA
  //var queryURL = "https://www.googleapis.com/youtube/v3/videos?id=7lCDEYXw3mM&key=AIzaSyCsKTmPxVHUp9o0kXMu5_gkI2XQU1ohWIA&part=snippet";
  //                https://www.googleapis.com/youtube/v3/search&key=AIzaSyCsKTmPxVHUp9o0kXMu5_gkI2XQU1ohWIA&part=snippet
  //function searchyoutube(artist) {

    // Querying the youtube api for the selected artist
   /*
    var queryURL = "https://www.googleapis.com/youtube/v3/search",{
                part: 'snippet, id',
                q: q,
                type: 'video',
                key: 'AIzaSyCsKTmPxVHUp9o0kXMu5_gkI2XQU1ohWIA'},
     
    $.ajax({
      url: queryURL,
      method: 'GET'
    }).then(function(response) {
      console.log(response);
    

      // Printing the entire object to console
      //console.log(kind)
      console.log(response.kind.items);
      
      // Constructing HTML containing the artist information
      
      //var artistName = $("<h1>").text(data.kind);
      
    });
      
     */
      /*
      console.log(data.similarartists.artist[0].name);
      console.log(data.similarartists.artist[0].url);
      console.log(data.similarartists.artist[0].image[0]['#text'])

      // Constructing HTML containing the artist information
      
      var artistName = $("<h1>").text(data.similarartists.artist[0].name);
      var artistURL = $("<a>").attr("href", data.similarartists.artist[0].url).append(artistName);
      var artistImage = $("<img>").attr("src", data.similarartists.artist[0].image[5]['#text']);


    var artistName2 = $("<h1>").text(data.similarartists.artist[1].name);
      var artistURL2 = $("<a>").attr("href", data.similarartists.artist[1].url).append(artistName);
      var artistImage2 = $("<img>").attr("src", data.similarartists.artist[1].image[5]['#text']);

    var artistName3 = $("<h1>").text(data.similarartists.artist[2].name);
      var artistURL3 = $("<a>").attr("href", data.similarartists.artist[2].url).append(artistName);
      var artistImage3 = $("<img>").attr("src", data.similarartists.artist[2].image[5]['#text']);

    var artistName4 = $("<h1>").text(data.similarartists.artist[3].name);
      var artistURL4 = $("<a>").attr("href", data.similarartists.artist[3].url).append(artistName);
      var artistImage4 = $("<img>").attr("src", data.similarartists.artist[3].image[5]['#text']);


      $("#artist-div").empty();
      $("#artist-div").append(artistName, artistURL, artistImage);
      $("#artist-div").append(artistName2, artistURL2, artistImage2);
      $("#artist-div").append(artistName3, artistURL3, artistImage3);
      $("#artist-div").append(artistName4, artistURL4, artistImage4);

    });
  }

  // Event handler for user clicking the select-artist button
  $("#select-artist").on("click", function(event) {
    // Preventing the button from trying to submit the form
    event.preventDefault();
    // Storing the artist name
    var inputArtist = $("#artist-input").val().trim();

    // Running the searchBandsInTown function (passing in the artist as an argument)
    searchLastFM(inputArtist);
    */
/*
   function search(){

    //clear results
    $('#results').html('');
    

    //Get Form Input
    q = $('#query').val();

    //Run GET Requests on API
    $.get(
        "https://www.googleapis.com/youtube/v3/search",{
                part: 'snippet, id',
                q: q,
                type: 'video',
                key: 'AIzaSyCsKTmPxVHUp9o0kXMu5_gkI2XQU1ohWIA'},
        ).done(function( data ) {
                var nextPageToken = data.nextPageToken;
                var prevPageToken = data.prevPageToken;
			
		

                var jsonPretty = JSON.stringify(data, null, '\t');

                $("#results").html(jsonPretty);
            // Printing the entire object to console
            console.log(data);

             // Constructing HTML containing the artist information
      
      var artistSearch = $("<h1>").text(data.kind);

      $('#query').empty();  
      
      $("#results").append(artistSearch);
     
            
  });
}


  */

  //Get Form Input

  $("#search-btn").on("click", function(event) {
    event.preventDefault();

    var q =  $('#query').val().trim();

    //      //clear results
//      $('#results').html('');
//
//  q = $('#query').val().trim();


 $.ajax({
 method: 'get',
 url: 'https://www.googleapis.com/youtube/v3/search?q=' + q + '&key=AIzaSyCsKTmPxVHUp9o0kXMu5_gkI2XQU1ohWIA&type=video&part=snippet&filter=id&maxResults=1&videoEmbeddable=true',
 dataType: "jsonp",
 }).done(function(data) {
console.log(data)
 })
})
// }
 //videoId  is what we want to grab
 //research js video library to put it into an iframe  https://www.javascripting.com/view/video-js
 //https://www.youtube.com/watch?v=oFYyTZwMyAg&feature=youtu.be
 
 
