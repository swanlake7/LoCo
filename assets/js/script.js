$(document).ready(function () {

    $("#searchMe").on("click", function(e){
        e.preventDefault();
        var searchBy = $("#searchBy").val();
        var custResponse = $("#searchTerm").val();
        var searchObj = {};
        searchObj[searchBy] = custResponse;

        getEvents(searchObj);
    })

});

function getEvents (searchParams) {
    const searchString = $.param(searchParams);
    var cncrtLoctaion = "https://api.seatgeek.com/2/events?client_id=OTA1MzgzM3wxNTcyNTMzMTQ3Ljk3&" + searchString;
    $.ajax({
        url: cncrtLoctaion,
        method: "GET"
    }).then(function (response) {
        for (i = 0; i < response.events.length; i++) {
            $("#results").append("<div>").attr("class", "eventReturn");
            $(".seatGeek").append("<p>Title: " + response.events[i].title + "</p>");
            $(".seatGeek").append("<p>Type of Event: " + response.events[i].type + "</p>");
            $(".seatGeek").append("<p>City: " + response.events[i].venue.city + "</p>");
            $(".seatGeek").append("<p>Venue: " + response.events[i].venue.name + "</p>");
            console.log(response.events[i].venue.location.lat);
            console.log(response.events[i].venue.location.lon);
        };
    });
}