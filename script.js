$(document).ready(function () {
    // Selector Variables
    var citySearch = $(".citySearch");
    var stateSearch = $(".stateSearch");
    var submitBtn = $("#submit-button");

    // Global Variables
    var userSearch = "";

    // Petfinder API Keys
    var petfinderKey = "SQ6UnllCHsLaZRcQkfninVeneIproVkudasiqT8gBYdpYAF9BA";
    var petfinderSecret = "Z2E41aprwiJbwOKRbfbuWvMKBFUk6jqFTQ9B12NA";

    // API Call functions
    function petfinderCall() {
        var pf = new petfinder.Client({ apiKey: petfinderKey, secret: petfinderSecret });

        pf.animal.search({ location: "Austin, Texas" })
            .then(function (response) {
                var animalsArr = response.data.animals;
                console.dir(animalsArr);
                var name = animalsArr[0].name;
                var age = animalsArr[0].age;
                var breed = animalsArr[0].breeds.primary;
                var gender = animalsArr[0].gender;
                var url = animalsArr[0].url;
                var description = "";
                if (description !== null) {
                    description = animalsArr[0].description;
                }
                console.log("Name " + name);
                console.log("Age " + age);
                console.log("Breeds " + breed);
                console.log("Gender " + gender);
                console.log(url);
                console.log(description);

                // Render photo
                var photo = animalsArr[0].primary_photo_cropped;
                var photoURL = "";
                if (photo !== null) {
                    photoURL = photo.small;
                    console.log("Photo URL: " + photoURL);
                }
                else {
                    photoURL = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/488px-No-Image-Placeholder.svg.png";
                    console.log("Photo URL: " + photoURL);
                }

                // Parse Contact info
                var address = animalsArr[0].contact.address.address1;
                console.log(address);
                var city = animalsArr[0].contact.address.city;
                console.log(city);
                var state = animalsArr[0].contact.address.state;
                console.log(state);

            })
            .catch(function (error) {
                // Handle the error
                console.log(error);
            });
    }


    // $("select").formSelect();

    // $("#submit").submit(function (event) {
    //     event.preventDefault();
    //     console.log(citySearch.val().trim());
    //     console.log(stateSearch.val());
    //     console.log("searched")
    // })

    submitBtn.on("click", function () {
        var userCity = citySearch.val();
        console.log(userCity);
        var userState = $(".input-field").val();
        console.log(userState);
    })

})