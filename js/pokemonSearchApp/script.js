const form = document.getElementById('pokemon-search-form');
const input = document.getElementById('search-input');
const pokemonName = document.getElementById('pokemon-name');
const pokemonID = document.getElementById('pokemon-id');
const pokemonWeight = document.getElementById('weight');
const pokemonHeight = document.getElementById('height');
const imageContainer = document.getElementById('image-container');
const pokemonType = document.getElementById('types');

let currentPokemonId;

const frontBtn = document.getElementById('front-btn');
const backBtn = document.getElementById('back-btn');

let pokemonDataArr = [];

const fetchAllData = async () => {
    try {
        const res = await fetch('https://pokeapi-proxy.freecodecamp.rocks/api/pokemon');
        const data = await res.json();
        pokemonDataArr = data.results;
    } catch (err) {
        console.log(err);
    }
};

fetchAllData();

const searchForPokemonName = (data, pokemonName) => {
    for (let {name, url} of data) {
        if (name === pokemonName) {
            return url;
        }
    }
    return false;
}

const searchForPokemonID = (data, pokemonID) => {
    for (let {id, url} of data) {
        if (id === pokemonID) {
            return url;
        }
    }
    return false;
}

const showData = ({name, id, weight, height, sprites, stats, types}) => {
    pokemonName.textContent = name.toUpperCase();
    pokemonID.textContent = `#${id}`;
    pokemonWeight.textContent = `Weight: ${weight}`;
    pokemonHeight.textContent = `Height: ${height}`;

    imageContainer.innerHTML = `
    <img src="${sprites.front_default}" id="sprite" alt="Sprite of ${name}" style="width: 300px; height: 300px;">  
  `;

    pokemonType.innerHTML = "";
    types.forEach(({type}) => {
        pokemonType.innerHTML += `<span>${type.name.toUpperCase()}</span>`
    });

    stats.forEach(({base_stat, stat}) => {
        document.getElementById(`${stat.name}`).textContent = `${base_stat}`;
    });

}

const fetchData = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data);
    showData(data);
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchInput = input.value;
    let url = false;

    if (!isNaN(parseInt(searchInput))) { // id input
        const pokemonID = parseInt(searchInput);
        url = searchForPokemonID(pokemonDataArr, pokemonID);
    } else {
        if (!/^[a-zA-Z-]+$/.test(searchInput)) {
            alert("Pokémon not found"); return;
        }
        const pokemonName = searchInput;
        url = searchForPokemonName(pokemonDataArr, pokemonName.toLowerCase());
    }

    if (!url) {
        alert("Pokémon not found"); return;
    }

    fetchData(url);
})
