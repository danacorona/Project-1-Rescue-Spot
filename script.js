var citySearch = $(".citySearch");
var stateSearch = $(".stateSearch");

$("document").ready(function(){
    $("select").formSelect();

    $("#submit").submit(function(event) {
        event.preventDefault();
        console.log(citySearch.val().trim());
        console.log(stateSearch.val());

    })

})