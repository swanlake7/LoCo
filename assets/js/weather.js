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

        $('#weatherResults').append(`<h2><img src="${current.icon}" /></h2>
        <ul>
        <li>${current.summary}</li>
        <li>${current.temperature}</li>
        <li>${current.humidity}</li>
        <li>${current.precipProbability}</li>
        </ul>`)
    });
};
