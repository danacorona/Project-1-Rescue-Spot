$(document).ready(function () {
    // Selector Variables
    var citySearch = $(".citySearch");
    var stateSearch = $(".stateSearch");
    var submitBtn = $("#submit-button");
    var dogInfo = $("#dog-info-container");
    var wishlist = $("#wishlist");

    // Global Variables
    // User search is the string from the city state submit form.
    var userSearch = "";
    var searchStorage = [];
    var saveSearch = {};



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


    // Initialization for dropdown states
    $("select").formSelect();

    // Submit Button event listener for City and State Search
    submitBtn.on("click", function (event) {
        event.preventDefault();
        // var userCity = citySearch.val().trim();
        // var userState = $("#states").val();

        // Store previous searches
        // localStorage.setItem("city", JSON.stringify(userCity));
        // localStorage.setItem("state", JSON.stringify(userState));
        // console.log(userCity, userState);

        // String to use for API call
        userSearch = $(".zipSearch").val().trim();
        petfinderCall();
    })



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
        console.log($(this));
        event.preventDefault();
        displayWishlist(searchStorage);
    })

    // Decode description function to account for apostrophes
    function decodeDescription(description) {
        return $("<span>").html(description).text();
    }

    // Function to show wishlist results
    function displayWishlist(searchStorage) {
        dogInfo.empty();
        var checkStorage = JSON.parse(localStorage.getItem("saved"));
        if (checkStorage !== null) {
            searchStorage = checkStorage;
        }
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
})