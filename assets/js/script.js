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
        console.log("pre if");
       // if band search has no results do a query search: 
        if (!response.events[0]) {

            var emptyLocation = "https://api.seatgeek.com/2/events?client_id=OTA1MzgzM3wxNTcyNTMzMTQ3Ljk3&" + emptySearch;
            console.log("empty" , emptyLocation);
            $.ajax({
                url: emptyLocation,
                method: "GET"
            }).then(function(response){
                console.log("in if",response);

            buildResponse(response);
            });
        } else {
            //band search
            buildResponse(response);
        };
        

            function buildResponse(response) {
                console.log("build function" , response);
                const eventId = response.events[0].id;
                const searchreq = `searchreq-${eventId}`;
                $("#ajaxResponse").prepend(`<div class="container ${searchreq}"></div>`);
                for (let i = 0; i < response.events.length; i++) {
                    let eventLat = response.events[i].venue.location.lat;
                    let eventLon = response.events[i].venue.location.lon;
                    let dateTime = response.events[i].datetime_local;
            
                 
                    //const to index our events for outputting to correct div
                    const eventId = response.events[i].id;
                    $(`.${searchreq}`).append(`<div class="columns" id="event-${eventId}">
                <div class="column" id="results">
                    <ul class="eventReturn">
                        <li><h2>${response.events[i].title}</h2></li>
                        <li>Type of event: ${response.events[i].type}</li>
                        <li>City: ${response.events[i].venue.city}</li>
                        <li>Venue: <a href="https://maps.apple.com/?q=${response.events[i].venue.name}, ${response.events[i].venue.address}, ${response.events[i].venue.state}, ${response.events[i].venue.city}, ${response.events[i].venue.postal_code}" target="_blank" rel="noopener">${response.events[i].venue.name}</a></li>
                        <li>Date: ${response.events[i].datetime_local}</li>
                        <li><a href="${response.events[i].url}" target="_blank" re="noopener"  >Tickets Page</a></li>
                        <li>Average Price: $${response.events[i].stats.average_price}</li>
                    </ul>
                </div>
            </div>`);

                    //pass data to weather api
                    getWeather(eventLat, eventLon, dateTime)
                        .then(function (weatherResponse) {
                            renderWeatherData(weatherResponse, eventId);
                        });

                }

                //prepending an imag and name based on first returned values

                 if (searchType == "band" && (response.events[0].type == "concert" || response.events[0].type == "music_festival")){
                     console.log("if");
                    $(`.searchreq-${eventId}`).prepend(`<div class="columns headRow">
            <div class="column" id="results">
                <div class="clearfix resultsHead">
                    <img class="resultImg" width="100px" src="${response.events[0].performers[0].image}" />
                    <h2 class="responseTitle" style="color:#fff">${response.events[0].performers[0].name}</h2>
                </div>
            </div>
        </div>`);
                } else if (searchType == "band" && response.events[0].taxonomies[0].name == "sports" ){
                    console.log("else if");
                        $('#ajaxResponse').prepend(`<div class="columns headRow">
                        <div class="column" id="results">
                            <div class="clearfix resultsHead">
                                <h2 class="responseTitle" style="color:#fff">${$("#bandVal").val()}</h2>    
                                ${"" /*<img class="resultImg" width="100px" src="${response.events[0].performers[0].image}" />*/}
                                
                            </div>
                        </div>
                    </div>`);
                } else { console.log("else");
                        $('#ajaxResponse').prepend(`<div class="columns headRow"">
                        <div class="column" id="results">
                            <div class="clearfix resultsHead">
                                <img class="resultImg" width="100px" src="${response.events[0].performers[0].image}" />
                                <h2 class="responseTitle" style="color:#fff">${$("#cityVal").val()}</h2>
                            </div>
                        </div>
                    </div>`);
                        }; 
            $('#cityVal').val('');
            $('#bandVal').val('')
        };
    });
};
