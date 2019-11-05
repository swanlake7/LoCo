var skycons = new Skycons({ "color": "teal" });
skycons.play();

//added datetime_local
function getWeather(latitude, longitude, datetime_local) {
    // const queryURlWeather = `https://darkskyproxy.jacoblamont.now.sh/api/weather?lat=${latitude}&lng=${longitude}`;
  
  const queryURlWeather = `https://darkskyproxy.jacoblamont.now.sh/api/weather?lat=${latitude}&lng=${longitude}&time=${datetime_local}&exclude=currently,flags`;
    console.log(queryURlWeather)

    return $.ajax({
        url: queryURlWeather,
        method: "GET"
    }).then(function (response) {
        return response.daily.data[0];
    });
};

function renderWeatherData(weather, eventId) {

    let current = {
        summary: "",
        temperatureHigh: "",
        temperatureLow: "",
        humidity: "",
        precipProbability: "",
        icon: ""
    }

    current.icon = weather.icon;
    current.temperatureHigh = weather.apparentTemperatureHigh;
    current.temperatureLow = weather.apparentTemperatureLow;
    current.summary = weather.summary;
    current.humidity = Math.floor(weather.humidity*100) + "%";
    current.precipProbability = Math.floor(weather.precipProbability *100) + "%";
   


    console.log(current);

    // removed from output temporarily: <li><img src="${current.icon}" /></li>

  //getWeather(42.3601, -71.0589, '2019-11-04T03:30:00');

  // in template literal below, you need to add a canvas element for the skycon

    $(`#event-${eventId}`).append(`<div class="column" id="weatherResults">
        <ul>
            <li><canvas id="event-${eventId}-icon"  width="70" height="70"></canvas></li>
            <li>${current.summary}</li>
            <li>Temperature High: ${current.temperatureHigh} F</li>
            <li>Temperature Low: ${current.temperatureLow} F</li>
            <li>Humidity: ${current.humidity}</li>
            <li>Chance of Rain: ${current.precipProbability}</li>
            
        </ul>   
    </div>`);

    // select the skycon canvas element for the #event-${eventId}, and add the appropriate icon using skycon.add(...)
    skycons.add(`event-${eventId}-icon`, current.icon);

}