const API_URL = 'https://api.thedogapi.com/v1/images/search?limit=3';
const button = document.getElementById("button");
const img1 = document.getElementById("image1");
const img2 = document.getElementById("image2");
const img3 = document.getElementById("image3");

async function loadDog () {
    const response = await fetch(API_URL);
    const data = await response.json();


    img1.src = data[0].url
    img2.src = data[1].url
    img3.src = data[2].url
}

button.onclick = loadDog;

loadDog();