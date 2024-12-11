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

let offset = 0; 
let LIMIT = 40; 
let loadingComplete = false;


async function init() {
    await getData();
    document.getElementById('search').addEventListener('input', filterPokemon); 
}

async function getData() {
    await fetchFirstFew();
    await fetchThemAll();
}

async function loadMorePokemon() {
    loadMore();
}

// get and interpret data

//Einholen der pokemon für die erste Seite
async function fetchFirstFew() {
    for (let i = 1; i <= 40; i++) { 
        let response = await fetch(DETAIL_URL_BASE + i + "/");
        let responseMon = await response.json();
        allPokemon.push(responseMon);
    }
    loadingComplete = true; 
    if (allPokemon.length > 39) {
        renderMonEntrys(); 
    }
    document.getElementById('search').addEventListener('input', filterPokemon); 
}


//Einholen der Pokemon für die Folgenden Seiten und die Suchfunktion
async function fetchThemAll() {
    let fetchPromises = [];
    for (let i = 41; i < 1025; i++) { 
        fetchPromises.push(fetch(DETAIL_URL_BASE + i + "/").then(response => response.json()));
    }
    let results = await Promise.all(fetchPromises);
    allPokemon.push(...results);

    loadingComplete = true; 
    if (allPokemon.length > 39) {
        renderMonEntrys(); 
    }
}

//Renderfunktion für 40 Pokekarten
async function renderMonEntrys() {
    if (allPokemon.length < 40) return; 
    let contentRef = document.getElementById('content');
    
    allPokemon.slice(offset, offset + LIMIT).forEach((pokemon, i) => {
        addPokemonToContent(contentRef, pokemon, offset + i + 1);
    });
    
    offset += LIMIT;
    animatedArea.style.display = 'none';
}


//Renderfunktion der Suchergebnisse
function renderFilteredMon(filteredPokemon) {
    let contentRef = document.getElementById('content');
    
    filteredPokemon.slice(offset, offset + LIMIT).forEach(pokemon => {
        addPokemonToContent(contentRef, pokemon, pokemon.id);
    });
    
    offset += LIMIT;
    animatedArea.style.display = 'none'; 
}

//Weitergabe von 'renderMonEntrys' und 'renderMon' an Template
function addPokemonToContent(contentRef, pokemon, id) {
    contentRef.innerHTML += getPokeTemplate(
        pokemon.name,
        pokemon.abilities.map(a => a.ability.name).join(", "),
        id,
        pokemon.types[0].type.name,
        colorPoke[pokemon.types[0].type.name],
        pokemon.moves.slice(0, 3).map(m => m.move.name).join(", "),
        pokemon.stats.map(s => `${s.stat.name}: ${s.base_stat}`).join(", ")
    );
}

//Interaktion mit der Seite


//Rendern von 40 weiteren Pokekarten
function loadMore() {
    animatedArea.style.display = 'block'; 
    setTimeout(() => {
        renderMonEntrys(); 
        //animatedArea.style.display = 'none'; 
    }, 1000); 
}


//Suchen ab 3 Buchstaben und aufrufen der Renderfunktion
function filterPokemon() {
    let searchTerm = document.getElementById('search').value.toLowerCase();
    if (searchTerm.length < 3) {
        document.getElementById('content').innerHTML = ''; 
        return;
    }
    let filteredPokemon = allPokemon.filter(pokemon => pokemon.name.toLowerCase().includes(searchTerm));
    offset = 0; 
    document.getElementById('content').innerHTML = ''; 
    renderFilteredMon(filteredPokemon); 
}

//Wenden der gewählten Pokekarte
function toggleFlip(card) {
    card.classList.toggle('flipped');
    let blurEffect = document.querySelector('.blur-effect');
    if (card.classList.contains('flipped')) {
        blurEffect.style.display = 'block';
        document.body.style.overflow = 'hidden'; 
    } else {
        blurEffect.style.display = 'none';
        document.body.style.overflow = 'auto'; 
    }
    console.log('toggel');
    
}

//Scroll zur vorangegangenen Pokekarte
function backFlip(card, id) {
    toggleFlip(card);

    setTimeout(() => {
        if (id > 1) { 
            let previousCard = document.querySelector(`.pokeCard[data-id="${id - 1}"]`);
            if (previousCard) {
                toggleFlip(previousCard);
            }
        }
    }, 700);
}


//Scroll zu darauffolgenden Pokekarte
function frontFlip(card, id) {
    toggleFlip(card);

    setTimeout(() => {
        if (id < 1025) {
            let nextCard = document.querySelector(`.pokeCard[data-id="${id + 1}"]`);
            if (nextCard) {
                toggleFlip(nextCard);
            }
        }
    }, 700);
}




