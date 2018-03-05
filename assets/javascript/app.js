function generateResultWidget (query) {
    var newWidget = $('<div class="card mb-4 bg-primary text-white"><h5 class="card-header">' + query + '</h5><div class="card-body"><script charset="utf-8" src="https://widget.bandsintown.com/main.min.js"></script><a class="card-text bit-widget-initializer" data-artist-name="' + query + '" data-display-local-dates="false" data-display-past-dates="true" data-auto-style="false" data-text-color="#000000" data-link-color="#2F95DE" data-popup-background-color="#FFFFFF" data-background-color="#FFFFFF" data-display-limit="15" data-link-text-color="#FFFFFF"></a><h5 </div>');

    $("#search-results").append(newWidget);
}

function clearSearchResults() {
    $("#search-results").empty();
}

function clearResultWidget() {
    $("#search-input").val('');
}

$("#submit-query").on("click", function (event) {
    event.preventDefault();

    var query = $("#search-input").val().trim();
    
   clearResultWidget();
   clearSearchResults();
   generateResultWidget(query);
});