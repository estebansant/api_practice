console.log("hello world");

const url = 'https://api.thedogapi.com/v1/images/search';
const button = document.getElementById("button");
const img = document.getElementById("image");

async function loadDog () {
    const request = await fetch(url);
    const response = await request.json();
    img.src = response[0].url
}

button.onclick = loadDog;