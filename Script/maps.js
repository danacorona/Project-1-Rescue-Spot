var cityName = "Austin";
        $.ajax({
        url: "https://api.mapbox.com/geocoding/v5/mapbox.places/" + cityName + ".json?access_token=pk.eyJ1IjoiZGFuYXhkZXNpIiwiYSI6ImNrang5Y201cTAyNjMyb2s3eGN2YnIxd2oifQ.73zCWiByD3IWE02kyeICaQ",
        method: "GET"
    }).then(function(response) {
        console.log(response);
        var lat = response.features[0].center[0];
        console.log (lat);
        var lon = response.features[0].center[1];
        console.log(lon);
        mapboxgl.accessToken = 'pk.eyJ1IjoiZGFuYXhkZXNpIiwiYSI6ImNrang5Y201cTAyNjMyb2s3eGN2YnIxd2oifQ.73zCWiByD3IWE02kyeICaQ';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
        center: [lat, lon], // starting position [lng, lat]
        zoom: 9 // starting zoom
    });
    });