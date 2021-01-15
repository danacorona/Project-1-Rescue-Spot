$(document).ready(function () {
    // API Keys
    var petfinderKey = "SQ6UnllCHsLaZRcQkfninVeneIproVkudasiqT8gBYdpYAF9BA";
    var petfinderSecret = "Z2E41aprwiJbwOKRbfbuWvMKBFUk6jqFTQ9B12NA";

    var location = "";

    // API Call functions
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
            var description = animalsArr[0].description;
            console.log("Name " + name);
            console.log("Age " + age);
            console.log("Breeds " + breed);
            console.log("Gender " + gender);
            console.log(url);
            console.log(description);

        })
        .catch(function (error) {
            // Handle the error
            console.log(error);
        });
})
