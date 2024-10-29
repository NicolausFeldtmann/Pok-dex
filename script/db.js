const BASE_URL = "https://pokeapi.co/api/v2/pokemon-species";
const MON_URL = "https://pokeapi.co/api/v2/pokemon-species/1";

let pokeTotal = [];
let pokeInfo = [];

function getData() {
    fetchThemAll();
    fetchPokeInfo();
}

async function fetchThemAll() {
    let response = await fetch(BASE_URL);
    let responseMon = await response.json();
    
    const results = responseMon.results;

    for (let i = 0; i < results.length; i++) {
        monToArray(results, i);
    }
    renderMonEntrys();
}

function monToArray (results, i) {
    pokeTotal.push(results[i]);
}

async function fetchPokeInfo() {
    let response = await fetch(MON_URL);
    let responseInfo = await response.json();
    console.log(responseInfo);

    const color = responseInfo.color;

    for (let i = 0; i < color.length; i++) {
        infoToArray(color, i);
    }
    renderInfoEntry();
}