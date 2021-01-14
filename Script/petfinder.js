$(document).ready(function () {
    // API Keys
    var petfinderKey = "SQ6UnllCHsLaZRcQkfninVeneIproVkudasiqT8gBYdpYAF9BA";
    var petfinderSecret = "Z2E41aprwiJbwOKRbfbuWvMKBFUk6jqFTQ9B12NA";

    var location = "";

    // API Call functions
    var pf = new petfinder.Client({ apiKey: petfinderKey, secret: petfinderSecret });

    pf.animal.search({ location: "Austin, Texas" })
        .then(function (response) {
            // Do something with `response.data.animals`
            console.dir(response);
            console.log(response.data.animals);
            var animalsArr = response.data.animals;
            for (i = 0; i < animalsArr.length; i++) {
                console.log(animalsArr[i]);
            }

        })
        .catch(function (error) {
            // Handle the error
            console.log(error);
        });
})
