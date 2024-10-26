const BASE_URL = "https://pokeapi.co/api/v2/pokemon-species/";

let poke = [
    {"name": "Testmon"},
    {"name": "Tesrmon2"},
    {"name": "Testmon3"},
    {"name": "Testmon4"},
    {"name": "Testmon5"},
]


function getData() {
    console.log('test');
    fetchThemAll();
}

async function fetchThemAll() {
let response = await fetch(BASE_URL);
let responseToJson = await response.json();
console.log(responseToJson);
}


