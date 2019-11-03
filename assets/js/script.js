$(document).ready(function () {

    $("#searchMe").on("click", function(e){
        // e.preventDefault();
        // var searchBy = $("#searchBy").val();
        // var custResponse = $("#searchTerm").val();
        // var searchObj = {};
        // searchObj[searchBy] = custResponse;

        getEvents()//searchObj);
    })

});

function getEvents (searchParams) {
    const searchString = $.param(searchParams);
    var cncrtLoctaion = "https://api.seatgeek.com/2/events?client_id=OTA1MzgzM3wxNTcyNTMzMTQ3Ljk3&q=mexico" + searchString;
    $.ajax({
        url: cncrtLoctaion,
        method: "GET"
    }).then(function (response) {
        for (i = 0; i < response.events.length; i++) {
            let eventLat = response.events[i].venue.location.lat;
            let eventLon = response.events[i].venue.location.lon;
            
            $("#results").append(`<ul class="eventReturn">
            <li>Title: ${response.events[i].title}</li>
            <li>Type of event: ${response.events[i].type}</li>
            <li>City: ${response.events[i].venue.city}</li>
            <li>Venue: ${response.events[i].venue.name}</li>
            </ul>`)
            
          /*   $("#results").append("<ul>").addClass("eventReturn");
            $(".eventReturn").append("<li>Title: " + response.events[i].title + "</li>");
            $(".eventReturn").append("<li>Type of Event: " + response.events[i].type + "</li>");
            $(".eventReturn").append("<li>City: " + response.events[i].venue.city + "</li>");
            $(".eventReturn").append("<li>Venue: " + response.events[i].venue.name + "</li>"); */
            
            getWeather(eventLat, eventLon);

        };
    });
}