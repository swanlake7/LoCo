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
            console.log(response.events[i].venue.location.lat);
            console.log(response.events[i].venue.location.lon);
        };
    });
}