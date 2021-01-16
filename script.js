$(document).ready(function () {
    // Selector Variables
    var citySearch = $(".citySearch");
    var stateSearch = $(".stateSearch");
    var submitBtn = $("#submit-button");
    var dogInfo = $("#dog-info-container");

    // Global Variables
    // User search is the string from the city state submit form.
    var userSearch = "";
    // These are the variables from the API call. 
    // I'm declaring them in the global scope as an empty string
    // due to scope issues with calling the function to populate the info cards inside the API call function
    // If someone knows a better solution I would love some help on this. -Trevor
    var name = "";
    var age = "";
    var gender = "";
    var url = "";
    var spayedNeutered = "";
    var address = "";
    var city = "";
    var state = "";
    var description = "";
    var photoURL = "";


    // Petfinder API Keys
    var petfinderKey = "SQ6UnllCHsLaZRcQkfninVeneIproVkudasiqT8gBYdpYAF9BA";
    var petfinderSecret = "Z2E41aprwiJbwOKRbfbuWvMKBFUk6jqFTQ9B12NA";

    // API Call functions
    function petfinderCall() {
        var pf = new petfinder.Client({ apiKey: petfinderKey, secret: petfinderSecret });

        pf.animal.search({ location: userSearch })
            .then(function (response) {
                //// Original array to pull data. 
                //// Can remove all console logs in function when data is working with dog cards
                var animalsArr = response.data.animals;
                console.dir(animalsArr);
                name = animalsArr[0].name;
                age = animalsArr[0].age;
                breed = animalsArr[0].breeds.primary;
                gender = animalsArr[0].gender;
                url = animalsArr[0].url;
                description = animalsArr[0].description;;
                if (description === null) {
                    description = "N/A"
                }
                spayedNeutered = animalsArr[0].attributes.spayed_neutered;
                if (spayedNeutered === true) {
                    spayedNeutered = "Yes"
                }
                else {
                    spayedNeutered = "No"
                }
                console.log("Name " + name);
                console.log("Age " + age);
                console.log("Breed " + breed);
                console.log("Gender " + gender);
                console.log(url);
                console.log(description);
                console.log(spayedNeutered);

                // Render photo
                var photo = animalsArr[0].primary_photo_cropped;
                if (photo !== null) {
                    photoURL = photo.small;
                    console.log("Photo URL: " + photoURL);
                }
                else {
                    photoURL = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/488px-No-Image-Placeholder.svg.png";
                    console.log("Photo URL: " + photoURL);
                }

                // Parse Contact info
                address = animalsArr[0].contact.address.address1;
                if (address == null) {
                    address = "";
                }
                console.log(address);
                city = animalsArr[0].contact.address.city;
                console.log(city);
                state = animalsArr[0].contact.address.state;
                console.log(state);
                populateDogCards();

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
        var userCity = citySearch.val().trim();
        var userState = $("#states").val();

        // String to use for API call
        userSearch = userCity + ", " + userState;
        petfinderCall();
    })

    // Function to populate Dag Cards Info
    function populateDogCards() {
        dogInfo.empty();
        dogInfo.prepend(/*html*/`<div class="card horizontal dog-cards">
                                    <div id="dog-image" class="card-image">
                                        <img class="materialboxed" width="100" height="200"
                                            src=${photoURL}
                                            alt="picture of available dog">
                                    </div>
                                    <div id="dog-card" class="card-stacked">
                                         <div class="card-content">
                                            <p>Name: ${name}</p>
                                            <p>Age: ${age}</p>
                                            <p>Gender: ${gender}</p>
                                            <p>Spayed/Neutered: ${spayedNeutered}</p>
                                            <p>Location: <span>${address}</span><br>
                                                        <span>${city}</span><br>
                                                        <span>${state}</span>
                                            </p>
                                            <p>Description: ${description}</p>
                                        </div>
                                        <div class="card-action">
                                            <a href=${url}>See more!</a>
                                        </div>
                                    </div>
                                </div>
                                 <br>`);
    }
})