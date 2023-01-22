const API_URL_RANDOM = 'https://api.thedogapi.com/v1/images/search?limit=3&api_key=live_Eyci7Tf2jCzBSqoXCrpkAQYglDT6BVE1AxBCNgwoobh5C4g9PVnPtgxT5ztU0nQ4';
const API_URL_FAV = 'https://api.thedogapi.com/v1/favourites?limit=3&api_key=live_Eyci7Tf2jCzBSqoXCrpkAQYglDT6BVE1AxBCNgwoobh5C4g9PVnPtgxT5ztU0nQ4';
const button = document.getElementById("button");

const spanError = document.getElementById("errorM");

async function randomDogs () {
    const response = await fetch(API_URL_RANDOM);
    const data = await response.json();
    const img1 = document.getElementById("image1");
    const img2 = document.getElementById("image2");
    const img3 = document.getElementById("image3");
    console.log("rdm");
    console.log(data);

    if (response.status !== 200) {
        spanError.innerHTML = "There was an error " + response.status + " please, try again later.";
    } else{
        img1.src = data[0].url
        img2.src = data[1].url
        img3.src = data[2].url
    }
}

async function favoriteDogs () {
    const response = await fetch(API_URL_FAV);
    const data = await response.json();
    console.log("fav");
    console.log(data);

    if (response.status !== 200) {
        spanError.innerHTML = "There was an error";
    } 
}

async function saveFavoriteDogs () {
    const res = await fetch(API_URL_FAV, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            image_id: "HyaztunHm",
        })
    });

    const data = await res.json();

    if (res.status !== 200) {
        spanError.innerHTML = "There was an error";
    } 

    console.log('save');
    console.log(res);
}

button.onclick = randomDogs;

randomDogs();
favoriteDogs();