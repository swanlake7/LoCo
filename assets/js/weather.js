
//added datetime_local
function getWeather(latitude, longitude, datetime_local) {
    // const queryURlWeather = `https://darkskyproxy.jacoblamont.now.sh/api/weather?lat=${latitude}&lng=${longitude}`;
  
  const queryURlWeather = `https://darkskyproxy.jacoblamont.now.sh/api/weather?lat=${latitude}&lng=${longitude}&time=${datetime_local}&exclude=currently,flags`;
    console.log(queryURlWeather)

    return $.ajax({
        url: queryURlWeather,
        method: "GET"
    }).then(function (response) {
        return response.currently;
    });
};

function renderWeatherData(weather, eventId) {

    let current = {
        summary: "",
        temperature: "",
        humidity: "",
        precipProbability: "",
        icon: ""
    }


    current.temperature = weather.temperature;
    current.summary = weather.summary;
    current.humidity = weather.humidity *100 + "%";
    current.precipProbability = weather.precipProbability;
    current.icon = weather.icon;


    console.log(current);

    // removed from output temporarily: <li><img src="${current.icon}" /></li>

  //getWeather(42.3601, -71.0589, '2019-11-04T03:30:00');


    $(`#event-${eventId}`).append(`<div class="column" id="weatherResults">
        <ul>
            <li>${current.summary}</li>
            <li>Current Temperature: ${current.temperature} F</li>
            <li>Current Humidity: ${current.humidity}</li>
            <li>Chance of Raing: ${current.precipProbability}</li>
        </ul>   
    </div>`);
      // For testing:
}

