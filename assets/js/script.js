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
    var cncrtLoctaion = "https://api.seatgeek.com/2/events?client_id=OTA1MzgzM3wxNTcyNTMzMTQ3Ljk3&" + searchString;
  
  console.log("qUrl: "+ cncrtLoctaion);
    $.ajax({
        url: cncrtLoctaion,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        for (i = 0; i < response.events.length; i++) {
            let eventLat = response.events[i].venue.location.lat;
            let eventLon = response.events[i].venue.location.lon;
            
            $("#results").prepend(`<ul class="eventReturn">
            <li><h2>Title: ${response.events[i].title}</h2></li>
            <li>Type of event: ${response.events[i].type}</li>
            <li>City: ${response.events[i].venue.city}</li>
            <li>Venue: ${response.events[i].venue.name}</li>
            <li><a href="${response.events[i].url}">Tickets Page</a></li>
            <li>Average Price: ${response.events[i].stats.average_price}</li>
            </ul>`)
            
          /*   $("#results").append("<ul>").addClass("eventReturn");
            $(".eventReturn").append("<li>Title: " + response.events[i].title + "</li>");
            $(".eventReturn").append("<li>Type of Event: " + response.events[i].type + "</li>");
            $(".eventReturn").append("<li>City: " + response.events[i].venue.city + "</li>");
            $(".eventReturn").append("<li>Venue: " + response.events[i].venue.name + "</li>"); */
            
           // getWeather(eventLat, eventLon);

        };

        //prepending an imag and name based on first returned values
        $('#results').prepend(`<div class="clearfix resultsHead">
        <img class="resultImg" width="100px" src="${response.events[0].performers[0].image}" />
        <h2 class="responseTitle" style="color:#fff">${response.events[0].performers[0].name}</h2>
        </div>`);
    });
}