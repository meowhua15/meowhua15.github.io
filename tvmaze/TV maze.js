const form = document.querySelector("#searchForm");
const TVdiv = document.querySelector("#TVImage");
const reset = document.querySelector("#reset");

form.addEventListener('submit', async function (e) {
    try {
        e.preventDefault();
        const searchTerm = form.elements.query.value;
        const searchResults = await searchTV(searchTerm);
        console.log(searchResults);
        makeImg(searchResults);
        form.elements.query.value = '';
    }
    catch (e) {
        console.log("error", e)
        const errorMsg = document.createElement("p");
        errorMsg.append("Sorry, no TV shows to be found :(")
        TVdiv.append(errorMsg);
    }
})

const searchTV = async (searchTerm) => {
    const config = { params: { q: searchTerm } };
    const res = await axios.get("https://api.tvmaze.com/search/shows", config);
    return res.data;
}

const makeImg = (searchResults) => {
    if (searchResults.length === 0) {
        const errorMsg = document.createElement("p");
        errorMsg.append("Sorry, no TV shows to be found :(")
        TVdiv.append(errorMsg);
    }
    for (let result of searchResults) {
        if (result.show.image) {
            const link = document.createElement("a");
            const img = document.createElement("img");
            const name = document.createElement('p');
            const film = document.createElement('p');
            name.innerText = result.show.name;
            img.setAttribute("src", result.show.image.medium);
            link.append(img);
            link.setAttribute("href", result.show.url);
            name.classList.add("name");
            film.classList.add("film");
            film.append(link);
            film.append(name);
            TVdiv.append(film);
        }
    }
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

reset.addEventListener('click', () => {
    removeAllChildNodes(TVdiv);
})

