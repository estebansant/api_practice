const API_URL_RANDOM = 'https://api.thedogapi.com/v1/images/search?limit=3&api_key=live_Eyci7Tf2jCzBSqoXCrpkAQYglDT6BVE1AxBCNgwoobh5C4g9PVnPtgxT5ztU0nQ4';
const API_URL_FAV = 'https://api.thedogapi.com/v1/favourites';
const API_URL_FAV_DEL = (id) => `https://api.thedogapi.com/v1/favourites/${id}`;
const API_URL_UPLOAD = 'https://api.thedogapi.com/v1/images/upload';

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
    const response = await fetch(API_URL_FAV, {
        method: "GET",
        headers: {
            'x-api-key': 'live_Eyci7Tf2jCzBSqoXCrpkAQYglDT6BVE1AxBCNgwoobh5C4g9PVnPtgxT5ztU0nQ4',
        }
    });
    const data = await response.json();
    console.log("fav");
    console.log(data);

    if (response.status !== 200) {
        spanError.innerHTML = "There was an error";
    } else {
        const div = document.getElementById("favoriteDogs");
        div.innerHTML = "";
        data.map(dog => {
            const article = document.createElement("article");
            const img = document.createElement("img");
            const button = document.createElement("button");
            const buttonText = document.createTextNode("Remove from favorites");

            button.appendChild(buttonText);
            button.onclick = () => deleteFavoriteDog(dog.id)
            img.src = dog.image.url;

            article.appendChild(img);
            article.appendChild(button);

            div.appendChild(article);
        })
    }
}

async function saveFavoriteDog (id) {
    const res = await fetch(API_URL_FAV, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'live_Eyci7Tf2jCzBSqoXCrpkAQYglDT6BVE1AxBCNgwoobh5C4g9PVnPtgxT5ztU0nQ4',
        },
        body: JSON.stringify({
            image_id: id,
        })
    });

    const data = await res.json();

    if (res.status !== 200) {
        spanError.innerHTML = "There was an error" + res.status + data.message;
    } else {
        console.log('dog saved on favorites');
        loadFavoriteDogs();
    }

    console.log('save');
    console.log(res);
}

async function deleteFavoriteDog (id) {
    const res = await fetch(API_URL_FAV_DEL(id), {
        method: "DELETE",
        headers: {
            'x-api-key': 'live_Eyci7Tf2jCzBSqoXCrpkAQYglDT6BVE1AxBCNgwoobh5C4g9PVnPtgxT5ztU0nQ4',
        }
    });

    const data = await res.json();

    if (res.status !== 200) {
        spanError.innerHTML = "There was an error" + res.status + data.message;
    } else {
        console.log('dog removed from favorites');
        loadFavoriteDogs();
    }
}

async function uploadDogPic () {
    const form = document.getElementById("uploadForm");
    const processForm = new FormData(form);

    console.log(processForm.get("file"));

    const res = await fetch(API_URL_UPLOAD, {
        method: "POST",
        headers: {
            // 'Content-Type': 'multipart/form-data',
            'x-api-key': 'live_Eyci7Tf2jCzBSqoXCrpkAQYglDT6BVE1AxBCNgwoobh5C4g9PVnPtgxT5ztU0nQ4',
        },
        body: processForm,
    });

    const data = await res.json();

    if (res.status !== 201) {
        spanError.innerHTML = `There was an error uploading the image: ${res.status} ${data.message}`
    }
    else {
        console.log("Dog picture uploaded :)");
        console.log({ data });
        console.log(data.url);
        saveFavoriteDog(data.id);
    }
}

button.onclick = randomDogs;

randomDogs();
loadFavoriteDogs();