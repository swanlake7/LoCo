$(document).ready(function () {

    $("#searchMe").on("click", function (e) {
        // e.preventDefault();
        // var searchBy = $("#searchBy").val();
        // var custResponse = $("#searchTerm").val();
        // var searchObj = {};
        // searchObj[searchBy] = custResponse;

        getEvents()//searchObj);
    })

});

function getEvents(searchParams, querySearch) {
    const searchString = $.param(searchParams);
    const emptySearch = $.param(querySearch);
    var cncrtLoctaion = "https://api.seatgeek.com/2/events?client_id=OTA1MzgzM3wxNTcyNTMzMTQ3Ljk3&" + searchString;

    console.log("qUrl: " + cncrtLoctaion);
    $.ajax({
        url: cncrtLoctaion,
        method: "GET"
    }).then(function (response) {
        if (response === []) {
            var emptyLocation = "https://api.seatgeek.com/2/events?client_id=OTA1MzgzM3wxNTcyNTMzMTQ3Ljk3&" + emptySearch;
            $.ajax({
                url: emptyLocation,
                method: "GET"
            }).then(buildResponse(response));
            console.log(response);
        }
        buildResponse(response);
            function buildResponse() {
                for (let i = 0; i < response.events.length; i++) {
                    let eventLat = response.events[i].venue.location.lat;
                    let eventLon = response.events[i].venue.location.lon;
                    let dateTime = response.events[i].datetime_local;

                    /* let wetArray = [];
                    let locationWet = {
                        long : eventLon,
                        lats : eventLat,
                    }
                    console.log(locationWet);
                    wetArray.push(locationWet); */

                    const eventId = response.events[i].id;
                    $("#ajaxResponse").prepend(`<div class="columns" id="event-${eventId}">
                <div class="column" id="results">
                    <ul class="eventReturn">
                        <li><h2>Title: ${response.events[i].title}</h2></li>
                        <li>Type of event: ${response.events[i].type}</li>
                        <li>City: ${response.events[i].venue.city}</li>
                        <li>Venue: ${response.events[i].venue.name}</li>
                        <li>Date: ${response.events[i].datetime_local}</li>
                        <li><a href="${response.events[i].url}">Tickets Page</a></li>
                        <li>Average Price: $${response.events[i].stats.average_price}</li>
                    </ul>
                </div>
            </div>`);

                    /*   $("#results").append("<ul>").addClass("eventReturn");
                      $(".eventReturn").append("<li>Title: " + response.events[i].title + "</li>");
                      $(".eventReturn").append("<li>Type of Event: " + response.events[i].type + "</li>");
                      $(".eventReturn").append("<li>City: " + response.events[i].venue.city + "</li>");
                      $(".eventReturn").append("<li>Venue: " + response.events[i].venue.name + "</li>"); */

                    getWeather(eventLat, eventLon, dateTime)
                        .then(function (weatherResponse) {
                            renderWeatherData(weatherResponse, eventId);
                        });

                }

                //prepending an imag and name based on first returned values

                if (searchType == "band") {
                    $('#ajaxResponse').prepend(`<div class="columns headRow">
            <div class="column" id="results">
                <div class="clearfix resultsHead">
                    <img class="resultImg" width="100px" src="${response.events[0].performers[0].image}" />
                    <h2 class="responseTitle" style="color:#fff">${response.events[0].performers[0].name}</h2>
                </div>
            </div>
        </div>`);
                } else {
                    $('#ajaxResponse').prepend(`<div class="columns headRow"">
            <div class="column" id="results">
                <div class="clearfix resultsHead">
                    <img class="resultImg" width="100px" src="${response.events[0].performers[0].image}" />
                    <h2 class="responseTitle" style="color:#fff">${$("#cityVal").val()}</h2>
                </div>
            </div>
        </div>`);
                };
        };
    });
};