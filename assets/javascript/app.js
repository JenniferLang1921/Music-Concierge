"use strict;"

var apiKeyOne = "3ab16c26dfaba69c000d8a6d7542d205";
var apiKeyTwo = "AIzaSyCsKTmPxVHUp9o0kXMu5_gkI2XQU1ohWIA";
var toplistsShowing = false;
var searchListShowing = false;

function incrementResultCounter() {
    resultCounter++;
}

var resultCounter = {
    num: 0,
};

function displayArtistInfo(data, location) {
    var counter = resultCounter.num;
    var searchListShowing = true;
    var itemArtist = data.artist.name;
    var itemBio = data.artist.bio.summary;
    var itemImage = data.artist.image[3]["#text"];
    var videoSearchQuery = itemArtist.replace(/\s/g, '+');
    var queryAppend = "+music+video";

    videoSearchQuery.concat(queryAppend);

    var videoLocation = '#artist-video' + counter;
    var newEventWidget = $('<div class="card mb-4 bg-primary text-white"><div class="card-body"><script charset="utf-8" src="https://widget.bandsintown.com/main.min.js"></script><a class="card-text bit-widget-initializer" data-artist-name="' + itemArtist + '" data-display-local-dates="false" data-display-past-dates="true" data-auto-style="false" data-text-color="#000000" data-link-color="#2F95DE" data-popup-background-color="#FFFFFF" data-background-color="#FFFFFF" data-display-limit="15" data-link-text-color="#FFFFFF"></a><h5 </div>');

    var newCard = $('<div class="row"><div class="card dummy-media-object artist-result"><div class="card-body"><li class="media"><img class="mr-3" src="' + itemImage + '" alt="Generic placeholder image"><div class="media-body"><h5 class="mt-0 mb-1">' + itemArtist + '</h5><p class="text-left">' + itemBio + '</p><div id="artist-video' + counter + '">VIDEO</div></div></li><div class="card text-center border-0"><div class="mb-2" id="accordion' + counter + '"><button class="btn btn-link p-0" data-toggle="collapse" data-target="#collapse' + counter + '" aria-expanded="true" aria-controls="collapse' + counter + '">Click here for concert schedule</button></div></div><div id="collapse' + counter + '" class="collapse" aria-labelledby="headingOne" data-parent="#accordion' + counter + '"><div class="card-body" id="collapse-widget">' + newEventWidget["0"].innerHTML + '</div></div></div></div></div>');

    $(location).append(newCard);
    displayArtistVideo(videoSearchQuery, videoLocation);
    counter++;
    resultCounter.num = counter;
}

function displayArtistVideo(query, location) {

    function tplawesome(e, t) {
        res = e;

        for (var n = 0; n < t.length; n++) {
            res = res.replace(/\{\{(.*?)\}\}/g,
                function (e, r) {
                    return t[n][r]
                })
        }
        return res
    }

    // prepare the request
    var request = gapi.client.youtube.search.list({
        part: "snippet",
        type: "video",
        q: query,
        maxResults: 1,
        order: "relevance",
        autoplay: 1,
        loop: 1
    });

    // execute the request
    request.execute(function (response) {
        var results = response.result;
        $(location).html("");
        $.each(results.items, function (index, item) {
            $.get("assets/tpl/item.html", function (data) {
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

    for (var i = 0; i < inputObj.length; i++) {
        var itemGenre = inputObj[i][0][0];
        var itemAlbum = inputObj[i][0][1];
        var itemArtist = inputObj[i][0][2];
        var itemImage = inputObj[i][0][3];
        var newListItem = $('<a class="dummy-media-object artist-tile" href="#" value="' + itemArtist.trim() + '"><img class="round" src="' + itemImage + '" alt="' + itemArtist + '"/><h3>#' + (i + 1) + ' ' + itemGenre + ' &mdash; ' + itemAlbum.italics() + ' &mdash; ' + itemArtist + '</h3></a>');

        $(location).append(newListItem);
    }
}

function retrieveArtistInfo(query) {

    var queryURL = 'https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=' + query + '&api_key=' + apiKeyOne + '&format=json&limit=10';

    $.ajax({
        method: "GET",
        url: queryURL
    }).then(function (response) {
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

    $.ajax({
        method: "GET",
        url: queryURL
    }).then(function (response) {
        for (var i = 0; i < response.tags.tag.length; i++) {
            tagListArr.push(response.tags.tag[i].name);
        }
        retrieveTopAlbumPerTag(tagListArr);
    });
}

function retrieveTopAlbumPerTag(inputObj) {
    var albumListArr = [];

    function addWorkArrItem(item) {
        albumListArr.push(item);
    }

    for (var i = 0; i < inputObj.length; i++) {
        var index = i;
        var queryURL = 'https://ws.audioscrobbler.com/2.0/?method=tag.gettopalbums&tag=' + inputObj[index] + '&api_key=' + apiKeyOne + '&format=json&limit=1';

        $.ajax({
            method: "GET",
            url: queryURL
        }).then(function (response) {
            var tempArr = [];
            var genre = (response.albums['@attr']['tag']);
            var album = (response.albums.album[0].name);
            var artist = (response.albums.album[0].artist.name);
            var image = (response.albums.album[0].image[3]["#text"]);

            tempArr.push([genre, album, artist, image]);
            addWorkArrItem(tempArr);

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

    $("#searchQuery").attr('value', rawQuery);
    $(".morphsearch-content").hide();

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

    morphSearch.querySelector('button[type="submit"]').addEventListener('click', function (ev) {
        ev.preventDefault();
        if ((document.getElementById("searchQuery").value).trim()) {
            $(".morphsearch-content").hide();

            var rawQuery = document.getElementById("searchQuery").value.trim();
            searchQuery = rawQuery.replace(/\s/g, '+');

            retrieveArtistInfo(searchQuery, '.morphsearch-results');
        }
    });

    morphSearch.querySelector('span[class="morphsearch-close"]').addEventListener('click', function (ev) {
        ev.preventDefault();
        $(".morphsearch-content").show();
        $(".morphsearch-results").empty();
    });
})();

function resetVideoHeight(location) {
    $(".video").css("height", $(location).width() * 9 / 16);
}

function init() {
    gapi.client.setApiKey(apiKeyTwo);
    gapi.client.load("youtube", "v3", function () {
        // yt api is ready
    });
}
