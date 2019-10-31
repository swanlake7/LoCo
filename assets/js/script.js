$( document ).ready(function() {
    let date = "october";
    var cncrtLoctaion = "https://www.eventbriteapi.com/v3/events/search?token=UYZ2YFDWG4G7B3MB4SUQ&sort_by=date&q="+ date;

$.ajax({
    url: "https://cors-anywhere.herokuapp.com/" + cncrtLoctaion,
    method: "GET"
}).then(function(response){
    console.log(response);
});




});