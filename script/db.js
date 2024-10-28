const BASE_URL = "https://pokeapi.co/api/v2/pokemon-species";

let pokeTotal = [];

function getData() {
    console.log('test');
    fetchThemAll();
}

async function fetchThemAll() {
    let response = await fetch(BASE_URL);
    let responseMon = await response.json();
    console.log(responseMon);
    

    const results = responseMon.results;

    for (let i = 0; i < results.length; i++) {
        monToArray(results, i);
    }
    renderMonEntrys();
}

function monToArray (results, i) {
    pokeTotal.push(results[i]);
}