// let latitude = 37.8267;
// let longitude = -122.4233;
// let currently = {
//     time: "",
//     summary: "",
//     temperature: "",
//     humidity: "",
//     precipProbability: "",
//     nearestStormDistance: "",
//     icon: ""
// }

// const queryURl = "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/5f327f3818b345c19bad8b553c5e00de/" + latitude + "," + longitude
// console.log(queryURls)

// $.ajax({
//     url: queryURl,
//     method: "GET"
// }).then(function (response) {
//     console.log(response)

//     function convertToF(celsius) {
//         var fahrenheit;
//         fahrenheit = (celsius * (9 / 5)) + 32;
//         return fahrenheit;
//     }

//     currently.temperature = convertToF(repsonse.currently.temperature);
//     currently.time = response.currently.time;
//     currently.summary = response.currently.summary;
//     currently.humidity = response.currently.humidity;
//     currently.precipProbability = response.currently.precipProbability;
//     currently.nearestStormDistance = response.currently.nearestStormDistance;
//     currently.icon = response.currently.icon;

//     console.log(currently)
// })
