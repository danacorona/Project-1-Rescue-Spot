$(document).ready(function () {
    // Selector Variables
    var submitBtn = $("#submit-button");
    var dogInfo = $("#dog-info-container");
    var searchHistory = [];

    var wishlist = $("#wishlist");

    // Global Variables
    // User search is the string from the city state submit form.
    var userSearch = "78704";
    var searchStorage = [];
    // var saveSearch = {};

    checkSavedSearches();
    loadMap();

    // Petfinder API Keys
    var petfinderKey = "SQ6UnllCHsLaZRcQkfninVeneIproVkudasiqT8gBYdpYAF9BA";
    var petfinderSecret = "Z2E41aprwiJbwOKRbfbuWvMKBFUk6jqFTQ9B12NA";

    // Petfinder API Call function
    function petfinderCall() {
        var pf = new petfinder.Client({ apiKey: petfinderKey, secret: petfinderSecret });

        pf.animal.search({
            location: userSearch,
            type: "dog",
            distance: 15,
            limit: 100
        })
            .then(function (response) {
                //// Original array to pull data. 
                animalsArr = response.data.animals;
                populateDogCards(animalsArr);
            })
            .catch(function (error) {
                // Handle the error
                console.log(error);
            });
    }


    // Submit Button event listener for City and State Search
    submitBtn.on("click", function (event) {
        event.preventDefault();
        // Local Storage saved zip searches        
        var savedZip = $(".zipSearch").val().trim();
        localStorage.setItem("zip", JSON.stringify(savedZip));
        searchHistory.unshift(savedZip);
        console.log(searchHistory);

        // String to use for API call
        userSearch = $(".zipSearch").val().trim();
        petfinderCall();
        loadMap();
    });

    // Function to populate Dag Cards Info
    function populateDogCards(animalsArr) {
        dogInfo.empty();
        for (var i = 0; i < animalsArr.length; i++) {
            name = animalsArr[i].name;
            age = animalsArr[i].age;
            breed = animalsArr[i].breeds.primary;
            gender = animalsArr[i].gender;
            url = animalsArr[i].url;
            description = animalsArr[i].description;
            if (description === null) {
                description = "N/A"
            }
            spayedNeutered = animalsArr[i].attributes.spayed_neutered;
            if (spayedNeutered === true) {
                spayedNeutered = "Yes"
            }
            else {
                spayedNeutered = "No"
            }

            // Render photo
            var photo = animalsArr[i].primary_photo_cropped;
            if (photo !== null) {
                photoURL = photo.small;
            }
            else {
                photoURL = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/488px-No-Image-Placeholder.svg.png";
            }

            // Parse Contact info
            address = animalsArr[i].contact.address.address1 + ",";
            if (address === "null,") {
                address = "";
            }
            city = animalsArr[i].contact.address.city;
            state = animalsArr[i].contact.address.state;

            dogInfo.append(/*html*/`<div class="card horizontal dog-cards">
                                    <div id="dog-image" class="card-image">
                                        <img class="materialboxed" id="photo-url-${[i]}" width="100" height="200"
                                            src=${photoURL}
                                            alt="picture of available dog">
                                    </div>
                                    <div id="dog-card" class="card-stacked">
                                         <div class="card-content">
                                            <p id="name-${[i]}">Name: ${name}</p>
                                            <p id="age-${[i]}">Age: ${age}</p>
                                            <p id="gender-${[i]}">Gender: ${gender}</p>
                                            <p id="spayed-neutered-${[i]}">Spayed/Neutered: ${spayedNeutered}</p>
                                            <p id="location-${[i]}">Location: ${address} ${city}, ${state}</p>
                                            <p id="description-${[i]}">Description: ${decodeDescription(description)}</p>
                                        </div>
                                        <div class="card-action">
                                            <a href=${url} id="url-${[i]}">See more!</a>
                                            <button class="btn waves-effect waves-light save-button" data-target="${[i]}" type="submit" name="action"
                                        color="white">Save</button>
                                        </div>
                                    </div>
                                </div>
                                 <br>`);
        }

        // Save button event listener
        $(".save-button").on("click", function (event) {
            event.preventDefault();
            var target = $(this).attr("data-target");
            console.log(target);
            var saveName = $("#name-" + target).text();
            var saveAge = $("#age-" + target).text();
            var saveGender = $("#gender-" + target).text();
            var saveSpeyedNeutered = $("#spayed-neutered-" + target).text();
            var saveLocation = $("#location-" + target).text();
            var saveDescription = $("#description-" + target).text();
            var savePhotoURL = $("#photo-url-" + target).attr("src");
            var saveURL = $("#url-" + target).attr("href");
            saveSearch = {
                name: saveName,
                age: saveAge,
                gender: saveGender,
                spayedNeutered: saveSpeyedNeutered,
                location: saveLocation,
                description: saveDescription,
                photoURL: savePhotoURL,
                url: saveURL
            };
            console.dir(saveSearch);
            searchStorage.push(saveSearch);
            console.dir(searchStorage);
            localStorage.setItem("saved", JSON.stringify(searchStorage));
        })
    }

    // Click event for wishlist
    wishlist.on("click", function (event) {
        event.preventDefault();
        if (searchStorage.length === 0) {
            dogInfo.empty();
            dogInfo.append(/*html*/`<h4>Your Wishlist Is Empty</h4>`);
        }
        else {
            displayWishlist(searchStorage);
        }
    })

    // Decode description function to account for apostrophes
    function decodeDescription(description) {
        return $("<span>").html(description).text();
    }

    // Function to show wishlist results
    function displayWishlist(searchStorage) {
        dogInfo.empty();
        for (i = 0; i < searchStorage.length; i++) {
            var photoURL = searchStorage[i].photoURL;
            var name = searchStorage[i].name;
            var age = searchStorage[i].age;
            var gender = searchStorage[i].gender;
            var spayedNeutered = searchStorage[i].spayedNeutered;
            var location = searchStorage[i].location;
            var description = searchStorage[i].description;
            var url = searchStorage[i].url;

            dogInfo.prepend(/*html*/`<div class="card horizontal dog-cards">
                                    <div id="dog-image" class="card-image">
                                        <img class="materialboxed" width="100" height="200"
                                            src=${photoURL}
                                            alt="picture of available dog">
                                    </div>
                                    <div id="dog-card" class="card-stacked">
                                         <div class="card-content">
                                            <p id="name-${[i]}">${name}</p>
                                            <p id="age-${[i]}">${age}</p>
                                            <p id="gender-${[i]}">${gender}</p>
                                            <p id="spayed-neutered-${[i]}">${spayedNeutered}</p>
                                            <p id="location-${[i]}">${location}</p>
                                            <p id="description-${[i]}">${description}</p>
                                        </div>
                                        <div class="card-action">
                                            <a href=${url} id="photo-url-${[i]}">See more!</a>
                                            <button class="btn waves-effect waves-light save-button" data-target="${[i]}" type="submit" name="action"
                                        color="white">Save</button>
                                        </div>
                                    </div>
                                </div>
                                 <br>`);
        }
    }

    // Function to check searchStorage
    function checkSavedSearches() {
        var checkStorage = JSON.parse(localStorage.getItem("saved"));
        if (checkStorage !== null) {
            searchStorage = checkStorage;
        }
    }


    function loadMap() {

        var lat = "";
        var lon = "";
        $.ajax({
            url: "https://api.mapbox.com/geocoding/v5/mapbox.places/" + userSearch + ".json?access_token=pk.eyJ1IjoiZGFuYXhkZXNpIiwiYSI6ImNrang5Y201cTAyNjMyb2s3eGN2YnIxd2oifQ.73zCWiByD3IWE02kyeICaQ",
            method: "GET"
        }).then(function (response) {
            var lat = response.features[0].center[0];
            var lon = response.features[0].center[1];
            console.log(lat, lon);
            mapboxgl.accessToken = 'pk.eyJ1IjoiZGFuYXhkZXNpIiwiYSI6ImNrang5Y201cTAyNjMyb2s3eGN2YnIxd2oifQ.73zCWiByD3IWE02kyeICaQ';
            var map = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
                center: [lat, lon], // starting position [lng, lat]
                zoom: 9 // starting zoom


            });
            $.ajax({
                url: "https://api.mapbox.com/geocoding/v5/mapbox.places/dog%20park.json?proximity=" + lat + "," + lon + "&access_token=pk.eyJ1IjoiZGFuYXhkZXNpIiwiYSI6ImNrang5Y201cTAyNjMyb2s3eGN2YnIxd2oifQ.73zCWiByD3IWE02kyeICaQ",
                method: "GET"
            }).then(function (response) {
                console.log(response);
                mapboxgl.accessToken = 'pk.eyJ1IjoiZGFuYXhkZXNpIiwiYSI6ImNrang5Y201cTAyNjMyb2s3eGN2YnIxd2oifQ.73zCWiByD3IWE02kyeICaQ';
                var map = new mapboxgl.Map({
                    container: 'map',
                    style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
                    center: [lat, lon], // starting position [lng, lat]
                    zoom: 9 // starting zoom
                });
            })
        })
    }
})