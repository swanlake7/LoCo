
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


    current.temperatureHigh = weather.apparentTemperatureHigh;
    current.temperatureLow = weather.apparentTemperatureLow;
    current.summary = weather.summary;
    current.humidity = Math.floor(weather.humidity*100) + "%";
    current.precipProbability = Math.floor(weather.precipProbability *100) + "%";
    current.icon = weather.icon;


    console.log(current);

    // removed from output temporarily: <li><img src="${current.icon}" /></li>

  //getWeather(42.3601, -71.0589, '2019-11-04T03:30:00');


    $(`#event-${eventId}`).append(`<div class="column" id="weatherResults">
        <ul>
            <li>${current.summary}</li>
            <li>Temperature High: ${current.temperatureHigh} F</li>
            <li>Temperature Low: ${current.temperatureLow} F</li>
            <li>Humidity: ${current.humidity}</li>
            <li>Chance of Rain: ${current.precipProbability}</li>
        </ul>   
    </div>`);
      // For testing:
}

