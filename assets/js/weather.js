function getWeather(latitude, longitude) {
    const queryURlWeather = `https://darkskyproxy.jacoblamont.now.sh/api/weather?lat=${latitude}&lng=${longitude}`;
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
    current.humidity = weather.humidity;
    current.precipProbability = weather.precipProbability;
    current.icon = weather.icon;

    console.log(current);

    // removed from output temporarily: <li><img src="${current.icon}" /></li>

    $(`#event-${eventId}`).append(`<div class="column" id="weatherResults">
        <ul>
            <li>${current.summary}</li>
            <li>Current Temperature: ${current.temperature} F</li>
            <li>Current Humidity: ${current.humidity}</li>
            <li>Chance of Raing: ${current.precipProbability}</li>
        </ul>   
    </div>`);
}