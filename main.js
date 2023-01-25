const API_URL_RANDOM = 'https://api.thedogapi.com/v1/images/search?limit=3&api_key=live_Eyci7Tf2jCzBSqoXCrpkAQYglDT6BVE1AxBCNgwoobh5C4g9PVnPtgxT5ztU0nQ4';
const API_URL_FAV = 'https://api.thedogapi.com/v1/favourites?&api_key=live_Eyci7Tf2jCzBSqoXCrpkAQYglDT6BVE1AxBCNgwoobh5C4g9PVnPtgxT5ztU0nQ4';
const button = document.getElementById("button");

const spanError = document.getElementById("errorM");

async function randomDogs () {
    const response = await fetch(API_URL_RANDOM);
    const data = await response.json();    

    console.log("rdm");
    console.log(data);

    if (response.status !== 200) {
        spanError.innerHTML = "There was an error " + response.status;
    } else{
        const img1 = document.getElementById("image1");
        const img2 = document.getElementById("image2");
        const img3 = document.getElementById("image3");
        const btn1 = document.getElementById("btn1");
        const btn2 = document.getElementById("btn2");
        const btn3 = document.getElementById("btn3");

        img1.src = data[0].url
        img2.src = data[1].url
        img3.src = data[2].url

        btn1.onclick = () => saveFavoriteDog(data[0].id);
        btn2.onclick = () => saveFavoriteDog(data[1].id);
        btn3.onclick = () => saveFavoriteDog(data[2].id);
    }
}

async function loadFavoriteDogs () {
    const response = await fetch(API_URL_FAV);
    const data = await response.json();
    console.log("fav");
    console.log(data);

    if (response.status !== 200) {
        spanError.innerHTML = "There was an error";
    } else {
        data.map(dog => {
            const section = document.getElementById("favoriteDogs");
            const article = document.createElement("article");
            const img = document.createElement("img");
            const button = document.createElement("button");
            const buttonText = document.createTextNode("Remove from favorites");

            button.appendChild(buttonText);
            img.src = dog.image.url;

            article.appendChild(img);
            article.appendChild(button);

            section.appendChild(article);
        })
    }
}

async function saveFavoriteDog (id) {
    const res = await fetch(API_URL_FAV, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            image_id: id,
        })
    });

    const data = await res.json();

    if (res.status !== 200) {
        spanError.innerHTML = "There was an error" + res.status + data.message;
    } 

    console.log('save');
    console.log(res);
}

button.onclick = randomDogs;

randomDogs();
loadFavoriteDogs();