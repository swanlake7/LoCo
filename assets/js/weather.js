function getWeather(latitude, longitude, datetime_local) {
    let current = {
        summary: "",
        temperature: "",
        humidity: "",
        precipProbability: "",
        icon: ""
    }

    const queryURlWeather = `https://darkskyproxy.jacoblamont.now.sh/api/weather?lat=${latitude}&lng=${longitude}&time=${datetime_local}&exclude=currently,flags`;

    $.ajax({
        url: queryURlWeather,
        method: "GET"
    }).then(function (response) {
        console.log(response)
        function convertToF(celsius) {
            var fahrenheit;
            fahrenheit = (celsius * (9 / 5)) + 32;
            return fahrenheit;
        }

        current.temperature = convertToF(response.currently.temperature);
        current.summary = response.currently.summary;
        current.humidity = response.currently.humidity;
        current.precipProbability = response.currently.precipProbability;
        current.icon = response.currently.icon;

        console.log(current);

        // removed from output temporarily: <li><img src="${current.icon}" /></li>

        $('#weatherResults').append(`
        <ul>
        <li>${current.summary}</li>
        <li>Current Temperature: ${current.temperature}</li>
        <li>Current Humidity: ${current.humidity}</li>
        <li>Chance of Raing: ${current.precipProbability}</li>
        </ul>`)
    });
};

// For testing:
getWeather(42.3601, -71.0589, '2019-11-04T03:30:00');
