var citySearch = $(".citySearch");
var stateSearch = $(".stateSearch");

$("document").ready(function(){
    $("select").formSelect();

    console.log(citySearch.val().trim());
    console.log(stateSearch);

})