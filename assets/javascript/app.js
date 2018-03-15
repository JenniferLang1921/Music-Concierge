"use strict;"

/*
var someElement = $('<a class="dummy-media-object" href="https://twitter.com/SaraSoueidan"><img class="round" src="https://lastfm-img2.akamaized.net/i/u/174s/3bace338cca24495c44dbbfed0e8fd4f.png" alt="Sara Soueidan"/><h3>Kendrick Lamar</h3></a>');
*/

var apiKeyOne = "3ab16c26dfaba69c000d8a6d7542d205";
var apiKeyTwo = "AIzaSyCsKTmPxVHUp9o0kXMu5_gkI2XQU1ohWIA";
var toplistsShowing = false;
var searchListShowing = false;

function incrementResultCounter() {
    resultCounter++;
    console.log(resultCounter);
}

var resultCounter = {
    num: 0,
};

function displayArtistInfo(data, location) {
    var counter = resultCounter.num;
    console.log(counter);
    var searchListShowing = true;
    var itemArtist = data.artist.name;
    var itemBio = data.artist.bio.summary;
    var itemImage = data.artist.image[3]["#text"];
    var videoSearchQuery = itemArtist.replace(/\s/g, '+');
    var queryAppend = "+music+video";

    videoSearchQuery.concat(queryAppend);

    var videoLocation = '#artist-video' + counter;
    //console.log(itemArtist);
    //console.log(itemBio);
    //console.log(itemImage);

    /*
    var newListItem = $('<a class="dummy-media-object artist-result-tile" href="#" value="' + itemArtist.trim() + '"><div><img class="round" src="' + itemImage + '" alt="' + itemArtist + '"/><h3>' + itemArtist + '</h3><p>' + itemBio + '</p><div></a>');
    */

    /*
    var newListItem = $('<a class="dummy-media-object artist-result-tile" href="#" value="' + itemArtist.trim() + '"><img class="round" src="' + itemImage + '" alt="' + itemArtist + '"/><h3>' + itemArtist + '</h3>' + '<span>' + itemBio + '</span></a>');
    */
    var newEventWidget = $('<div class="card mb-4 bg-primary text-white"><div class="card-body"><script charset="utf-8" src="https://widget.bandsintown.com/main.min.js"></script><a class="card-text bit-widget-initializer" data-artist-name="' + itemArtist + '" data-display-local-dates="false" data-display-past-dates="true" data-auto-style="false" data-text-color="#000000" data-link-color="#2F95DE" data-popup-background-color="#FFFFFF" data-background-color="#FFFFFF" data-display-limit="15" data-link-text-color="#FFFFFF"></a><h5 </div>');
    //console.log(newEventWidget);

    var newCard = $('<div class="row"><div class="card dummy-media-object artist-result"><div class="card-body"><li class="media"><img class="mr-3" src="' + itemImage + '" alt="Generic placeholder image"><div class="media-body"><h5 class="mt-0 mb-1">' + itemArtist + '</h5><p class="text-left">' + itemBio + '</p><div id="artist-video' + counter + '">VIDEO</div></div></li><div class="card text-center border-0"><div class="mb-2" id="accordion' + counter + '"><button class="btn btn-link p-0" data-toggle="collapse" data-target="#collapse' + counter + '" aria-expanded="true" aria-controls="collapse' + counter + '">Click here for concert schedule</button></div></div><div id="collapse' + counter + '" class="collapse" aria-labelledby="headingOne" data-parent="#accordion' + counter + '"><div class="card-body" id="collapse-widget">' + newEventWidget["0"].innerHTML + '</div></div></div></div></div>');


    $(location).append(newCard);
    displayArtistVideo(videoSearchQuery, videoLocation);
    counter++;
    resultCounter.num = counter;
    //console.log(resultCounter.num);
}

function displayArtistVideo(query, location) {
    console.log('video search query: ', query);
    console.log('video location: ', location);

    function tplawesome(e, t) { res = e; for (var n = 0; n < t.length; n++) { res = res.replace(/\{\{(.*?)\}\}/g, function (e, r) { return t[n][r] }) } return res }

    // prepare the request
    var request = gapi.client.youtube.search.list({
        part: "snippet",
        type: "video",
        q: query,
        //q: encodeURIComponent($("#search").val()).replace(/%20/g, "+"),
        maxResults: 1,
        order: "relevance",
        autoplay: 1,
        loop: 1
    });

    console.log('request: ', request);
    console.log('video location: ', location);
    //console.log('request.q: ', request.q);

    // execute the request
    request.execute(function (response) {
        var results = response.result;
        console.log(results);
        $(location).html("");
        $.each(results.items, function (index, item) {
            $.get("tpl/item.html", function (data) {
                $(location).append(tplawesome(data, [{ "title": item.snippet.title, "videoid": item.id.videoId }]));
            });
        });
        resetVideoHeight(location);
    });
}

function displayTopArtistList(inputObj, location) {

    for (var i = 0; i < inputObj.artists.artist.length; i++) {
        var itemArtist = inputObj.artists.artist[i].name;
        var itemImage = inputObj.artists.artist[i].image[3]["#text"];
        var newListItem = $('<a class="dummy-media-object artist-tile" href="#" value="' + itemArtist.trim() + '"><img class="round" src="' + itemImage + '" alt="' + itemArtist + '"/><h3>#' + (i + 1) + ' ' + itemArtist + '</h3></a>');

        $(location).append(newListItem);
    }
}

function displayTopTrackPanel(inputObj, location) {
    for (var i = 0; i < inputObj.tracks.track.length; i++) {
        var itemArtist = inputObj.tracks.track[i].artist.name;
        var itemTrackTitle = inputObj.tracks.track[i].name;
        var itemImage = inputObj.tracks.track[i].image[3]["#text"];
        var newListItem = $('<a class="dummy-media-object artist-tile" href="#" value="' + itemArtist.trim() + '"><img class="round" src="' + itemImage + '" alt="' + itemArtist + '"/><h3>#' + (i + 1) + ' ' + itemTrackTitle + ' &mdash; ' + itemArtist + '</h3></a>');

        $(location).append(newListItem);
    }
}

function displayTopAlbumPerTag(inputObj, location) {
    //console.log(inputObj.length);
    /*
    console.log(inputObj);
    console.log(inputObj.length);
    console.log(inputObj[0][0][0]);
    console.log(inputObj[1][0][1]);
    console.log(inputObj[2][0]);
    console.log(inputObj[3][0]);
    console.log(inputObj[1]);
    */
    //console.log(inputObj[0]['0']);

    for (var i = 0; i < inputObj.length; i++) {
        //console.log(inputObj[i][0][0]);
        var itemGenre = inputObj[i][0][0];
        var itemAlbum = inputObj[i][0][1];
        var itemArtist = inputObj[i][0][2];
        var itemImage = inputObj[i][0][3];
        var newListItem = $('<a class="dummy-media-object artist-tile" href="#" value="' + itemArtist.trim() + '"><img class="round" src="' + itemImage + '" alt="' + itemArtist + '"/><h3>#' + (i + 1) + ' ' + itemGenre + ' &mdash; ' + itemAlbum.italics() + ' &mdash; ' + itemArtist + '</h3></a>');

        $(location).append(newListItem);
    }
}

function retrieveArtistEvents() {
    //stub
}

function retrieveArtistInfo(query) {

    var queryURL = 'https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=' + query + '&api_key=' + apiKeyOne + '&format=json&limit=10';
    //console.log(queryURL);

    $.ajax({
        method: "GET",
        url: queryURL
    }).then(function (response) {
        //console.log(response);
        displayArtistInfo(response, '.morphsearch-results');
    });
}

function retrieveTopTracks() {
    var queryURL = 'https://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=' + apiKeyOne + '&format=json&limit=10';

    $.ajax({
        method: "GET",
        url: queryURL
    }).then(function (response) {
        displayTopTrackPanel(response, '#search-panel-middle');
    });
}

function retrieveTopArtists() {
    var queryURL = 'https://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=' + apiKeyOne + '&format=json&limit=10';

    $.ajax({
        method: "GET",
        url: queryURL
    }).then(function (response) {
        displayTopArtistList(response, '#search-panel-left');
    });
}

function retrieveTopTags() {
    var queryURL = 'https://ws.audioscrobbler.com/2.0/?method=chart.gettoptags&api_key=' + apiKeyOne + '&format=json&limit=10';
    var tagListArr = [];
    //console.log(queryURL);
    //console.log(tagListArr);

    $.ajax({
        method: "GET",
        url: queryURL
    }).then(function (response) {
        for (var i = 0; i < response.tags.tag.length; i++) {
            tagListArr.push(response.tags.tag[i].name);
            //console.log(tagListArr);
        }
        retrieveTopAlbumPerTag(tagListArr);
    });
}

function retrieveTopAlbumPerTag(inputObj) {
    //console.log(inputObj);
    var albumListArr = [];

    function addWorkArrItem(item) {
        albumListArr.push(item);
        //console.log(workArr.length);
    }

    for (var i = 0; i < inputObj.length; i++) {
        var index = i;
        var queryURL = 'https://ws.audioscrobbler.com/2.0/?method=tag.gettopalbums&tag=' + inputObj[index] + '&api_key=' + apiKeyOne + '&format=json&limit=1';
        //console.log(index, inputObj[index]);

        $.ajax({
            method: "GET",
            url: queryURL
        }).then(function (response) {
            /*
            console.log(response);
            console.log('Genre: ', response.albums['@attr']['tag']);
            console.log('Album name: ', response.albums.album[0].name);
            console.log('Artist name: ', response.albums.album[0].artist.name);
            console.log('Image source: ', response.albums.album[0].image[3]["#text"]);
            */
            var tempArr = [];
            var genre = (response.albums['@attr']['tag']);
            var album = (response.albums.album[0].name);
            var artist = (response.albums.album[0].artist.name);
            var image = (response.albums.album[0].image[3]["#text"]);
            //console.log(index, genre);
            tempArr.push([genre, album, artist, image]);
            addWorkArrItem(tempArr);
            //console.log(albumListArr.length);
            if (albumListArr.length === 10) {
                displayTopAlbumPerTag(albumListArr, '#search-panel-right');
            }

        });
        index++;
    }

}

document.getElementById('morphsearch').addEventListener('click', function (ev) {
    ev.preventDefault();

    if (!toplistsShowing && !searchListShowing) {
        retrieveTopArtists();
        retrieveTopTracks();
        retrieveTopTags();
        toplistsShowing = true;
    }
});

$(document).on('click', '.artist-tile', function (ev) {
    ev.preventDefault();

    rawQuery = $(this).attr('value').trim();
    searchQuery = rawQuery.replace(/\s/g, '+');
    //console.log('raw query: ', rawQuery);
    //console.log('search query: ', searchQuery);

    $("#searchQuery").attr('value', rawQuery);

    $(".morphsearch-content").hide();
    /*
    $(".morphsearch-results").append('<a class="dummy-media-object" href="https://twitter.com/SaraSoueidan"><img class="round" src="https://lastfm-img2.akamaized.net/i/u/174s/3bace338cca24495c44dbbfed0e8fd4f.png" alt="Sara Soueidan"/><h3>' + document.getElementById("searchQuery").value + '</h3></a>');
    */

    retrieveArtistInfo(searchQuery);
});

(function () {
    var morphSearch = document.getElementById('morphsearch'),
        input = morphSearch.querySelector('input.morphsearch-input'),
        ctrlClose = morphSearch.querySelector('span.morphsearch-close'),
        isOpen = isAnimating = false,
        // show/hide search area
        toggleSearch = function (evt) {
            // return if open and the input gets focused
            if (evt.type.toLowerCase() === 'focus' && isOpen) return false;

            var offsets = morphsearch.getBoundingClientRect();
            if (isOpen) {
                classie.remove(morphSearch, 'open');

                // trick to hide input text once the search overlay closes 
                // todo: hardcoded times, should be done after transition ends
                if (input.value !== '') {
                    setTimeout(function () {
                        classie.add(morphSearch, 'hideInput');
                        setTimeout(function () {
                            classie.remove(morphSearch, 'hideInput');
                            input.value = '';
                        }, 300);
                    }, 500);
                }

                input.blur();
            }
            else {
                classie.add(morphSearch, 'open');
            }
            isOpen = !isOpen;
        };

    // events
    input.addEventListener('focus', toggleSearch);
    ctrlClose.addEventListener('click', toggleSearch);
    // esc key closes search overlay
    // keyboard navigation events
    document.addEventListener('keydown', function (ev) {
        var keyCode = ev.keyCode || ev.which;
        if (keyCode === 27 && isOpen) {
            toggleSearch(ev);
            $(".morphsearch-content").show();
            $(".morphsearch-results").empty();
        }
    });



    /***** for demo purposes only: don't allow to submit the form *****/
    morphSearch.querySelector('button[type="submit"]').addEventListener('click', function (ev) {
        ev.preventDefault();
        if ((document.getElementById("searchQuery").value).trim()) {
            $(".morphsearch-content").hide();
            //console.log(document.getElementById("searchQuery").value);

            var rawQuery = document.getElementById("searchQuery").value.trim();
            searchQuery = rawQuery.replace(/\s/g, '+');

            //console.log('raw query: ', rawQuery);
            //console.log('search query: ', searchQuery);

            retrieveArtistInfo(searchQuery, '.morphsearch-results');
        }
    });

    morphSearch.querySelector('span[class="morphsearch-close"]').addEventListener('click', function (ev) {
        ev.preventDefault();
        $(".morphsearch-content").show();
        $(".morphsearch-results").empty();
    });
})();

// Youtube video code

function resetVideoHeight(location) {
    $(".video").css("height", $(location).width() * 9 / 16);
}

function init() {
    gapi.client.setApiKey(apiKeyTwo);
    gapi.client.load("youtube", "v3", function () {
        // yt api is ready
        //retrieveArtistInfo();
    });

    console.log(gapi);
}

/*
$(function () {
    $("form").on("submit", function (e) {
        e.preventDefault();
        // prepare the request
        var request = gapi.client.youtube.search.list({
            part: "snippet",
            type: "video",
            q: encodeURIComponent($("#search").val()),
            maxResults: 1,
            order: "viewCount",
            autoplay: 1,
            loop: 1,
        });
        // execute the request
        request.execute(function (response) {
            var results = response.result;
            $("#artist-video").html("");
            $.each(results.items, function (index, item) {
                $.get("yt.html", function (data) {
                    $("#artist-video").append(yt(data, [
                        {
                            "title": item.snippet.title,
                            "videoid": item.id.videoId
                        }]));
                });
            });
            resetVideoHeight();
        });
    });

    $(window).on("resize", resetVideoHeight);
});
*/
