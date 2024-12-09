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
    if (allPokemon.length < 40) return; 
    let contentRef = document.getElementById('content');
    allPokemon.slice(offset, offset + LIMIT).forEach((pokemon, i) => {
        contentRef.innerHTML += getPokeTemplate(
            pokemon.name,
            pokemon.abilities.map(a => a.ability.name).join(", "),
            offset + i + 1,
            pokemon.types[0].type.name,
            colorPoke[pokemon.types[0].type.name],
            pokemon.moves.slice(0, 3).map(m => m.move.name).join(", "),
            pokemon.stats.map(s => `${s.stat.name}: ${s.base_stat}`).join(", ")
        );
    });
    offset += LIMIT;
    animatedArea.style.display = 'none';
}

//Interaktion mit der Seite

function loadMorePokemon() {
    animatedArea.style.display = 'block'; 
    setTimeout(() => {
        renderMonEntrys(); 
        animatedArea.style.display = 'none'; 
    }, 1000); 
}

function filterPokemon() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    if (searchTerm.length < 3) {
        document.getElementById('content').innerHTML = ''; 
        return;
    }
    const filteredPokemon = allPokemon.filter(pokemon => pokemon.name.toLowerCase().includes(searchTerm));
    offset = 0; 
    document.getElementById('content').innerHTML = ''; 
    renderFilteredMonEntrys(filteredPokemon); 
}

function toggleFlip(card) {
    card.classList.toggle('flipped');
    const blurEffect = document.querySelector('.blur-effect');
    if (card.classList.contains('flipped')) {
        blurEffect.style.display = 'block'; 
    } else {blurEffect.style.display = 'none'; 
    }
    console.log('toggel');
    
}

function backFlip(card, id) {
    toggleFlip(card);

    setTimeout(() => {
        if (id > 1) { 
            let previousCard = document.querySelector(`.pokeCard[data-id="${id - 1}"]`);
            if (previousCard) {
                toggleFlip(previousCard);
            }
        }
    }, 1000);
}

function frontFlip(card, id) {
    toggleFlip(card);

    setTimeout(() => {
        if (id < 1025) {
            let nextCard = document.querySelector(`.pokeCard[data-id="${id + 1}"]`);
            if (nextCard) {
                toggleFlip(nextCard);
            }
        }
    }, 1000);
}

