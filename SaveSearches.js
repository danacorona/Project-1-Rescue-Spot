$(document).ready(function() {

    var cityArray = [];
    var pastSearch = "";
    var searchedCity = $(".city-search").text().val().trim();
    pastSearch.append(searchedCity);

    localStorage.setItem("text", searchedCity);
    console.log(searchedCity);

}) 