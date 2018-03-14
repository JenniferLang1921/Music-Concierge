
//Get Form Input

$("#search-btn").on("click", function (event) {
  event.preventDefault();

  var q = $('#query').val().trim();

  //      //clear results
  //      $('#results').html('');
  //
  //  q = $('#query').val().trim();


  $.ajax({
    method: 'get',
    url: 'https://www.googleapis.com/youtube/v3/search?q=' + q + '&key=AIzaSyCsKTmPxVHUp9o0kXMu5_gkI2XQU1ohWIA&type=video&part=snippet&filter=id&maxResults=1&videoEmbeddable=true',
    dataType: "jsonp",
  }).done(function (data) {
    console.log(data)
    console.log(data.items[0].id.videoId)
    var videoId = data.items[0].id.videoId;
    var iframe = $("#youTubeIframe").attr("src", "//www.youtube.com/embed/" + videoId);

  })
})
/*
<div class="item">
    <h2>{{title}}</h2>
    <iframe class="video w100" width="640" height="360" src="//www.youtube.com/embed/{{videoid}}" frameborder="0" allowfullscreen></iframe>
</div>

base youtube url https://www.youtube.com/watch?v=
*/




