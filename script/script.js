let colorPoke = {
    normal: "rgb(206, 206, 206)",
    fire: "rgb(255, 107, 107)",
    fighting: "rgb(255, 128, 0)",
    water: "rgb(41, 128, 239)",
    flying: "rgb(129, 185, 239)",
    grass: "rgb(124, 198, 107)",
    poison: "rgb(150, 76, 206)",
    electric: "rgb(250, 192, 0)",
    ground: "rgb(150, 108, 78)",
    psychic: "rgb(255, 79, 134)",
    rock: "rgb(150, 148, 132)",
    ice: "rgb(185, 234, 247)",
    bug: "rgb(177, 188, 90)",
    dragon: "rgb(0, 22, 196)",
    ghost: "rgb(168, 26, 168)",
    dark: "rgb(71, 54, 54)",
    steel: "rgb(132, 166, 178)",
    fairy: "rgb(252, 169, 220)",
    stellar: "rgb(64, 181, 165)",
};

let pokeDetailTest = [];
let offset = 0; 
let LIMIT = 150; 
let loadingComplete = false; 

async function init() {
    await getData(); 
}

async function getData() {
    await fetchThemAll();
}

// get and interpret data
async function fetchThemAll() {
    for (let i = 1; i <= 1025; i++) { 
        let response = await fetch(DETAIL_URL_BASE + i + "/");
        let responseMon = await response.json();
        allPokemon.push(responseMon);
    }
    loadingComplete = true; 
    if (allPokemon.length > 0) {
        renderMonEntrys(); 
    }
}

async function renderMonEntrys() {
    let contentRef = document.getElementById('content');
    let start = offset;
    let end = offset + LIMIT;
    let pokemonToRender = allPokemon.slice(start, end);
    for (let i = 0; i < pokemonToRender.length; i++) {
        let pokemon = pokemonToRender[i];
        let name = pokemon.name;
        let id = start + i + 1; 
        let typeName = pokemon.types[0].type.name;
        let abilities = pokemon.abilities.map(ability => ability.ability.name).join(", "); 
        let backgroundColor = colorPoke[typeName];
        let moves = pokemon.moves.slice(0, 3).map(move => move.move.name).join(", ");
        let stats = pokemon.stats.map(stat => `${stat.stat.name}: ${stat.base_stat}`).join(", ");
        contentRef.innerHTML += getTestTemplate(name, abilities, id, typeName, backgroundColor, moves, stats);
    }
    offset += LIMIT; 
    animatedArea.style.display = 'none'; 
}

async function fetchInfo(id) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`);
    const responseDetail = await response.json();
    const flavorText = responseDetail.flavor_text_entries
        .find(entry => entry.language.name === 'en'); 
    const flavorTextContent = flavorText ? flavorText.flavor_text : "Kein Geschmackstext verfügbar";
    document.getElementById(`card-back-${id}`).innerHTML = getBackSideTemplate(flavorTextContent);
}

function loadMorePokemon() {
    animatedArea.style.display = 'block'; 
    setTimeout(() => {
        renderMonEntrys(); 
        animatedArea.style.display = 'none'; 
    }, 100); 
}

function monToArray(results, index) {
    pokeTotal[index] = results[index]; 
}

function detailToArray (results, a) {
    monDetail.push(results[a]);
}

function filterAndShowNames(filterWord) {
    currentNames = pokeTotal.filter( name => name.includes(filterWord))
    renderBackSide();
}
    


