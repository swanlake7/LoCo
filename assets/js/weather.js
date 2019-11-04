function getWeather(latitude, longitude) {
    let current = {
        summary: "",
        temperature: "",
        humidity: "",
        precipProbability: "",
        icon: ""
    }

    const queryURlWeather = `https://darkskyproxy.jacoblamont.now.sh/api/weather?lat=${latitude}&lng=${longitude}`;
    console.log(queryURlWeather)

    $.ajax({
        url: queryURlWeather,
        method: "GET"
    }).then(function (response) {

        current.temperature = response.currently.temperature;
        current.summary = response.currently.summary;
        current.humidity = response.currently.humidity;
        current.precipProbability = response.currently.precipProbability;
        current.icon = response.currently.icon;

        console.log(current);
        
// removed from output temporarily: <li><img src="${current.icon}" /></li>

        $('#weatherResults').append(`
        <ul>
        <li>${current.summary}</li>
        <li>Current Temperature: ${current.temperature} F</li>
        <li>Current Humidity: ${current.humidity}</li>
        <li>Chance of Raing: ${current.precipProbability}</li>
        </ul>`)
    });
};
