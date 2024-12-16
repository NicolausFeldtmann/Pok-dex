
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

async function fetchThemAll() {
    let fetchPromises = [];
    for (let i = 1; i < 1025; i++) { 
        fetchPromises.push(fetch(DETAIL_URL_BASE + i + "/").then(response => response.json()));
    }
    let results = await Promise.all(fetchPromises);
    allPokemon.push(...results);

    loadingComplete = true; 
    if (allPokemon.length > 0) {
        renderMonEntrys(); 
    }
}

async function renderMonEntrys() {
    if (allPokemon.length < 40) return; 
    let contentRef = document.getElementById('content');
    
    allPokemon.slice(offset, offset + LIMIT).forEach((pokemon, i) => {
        addPokemonToContent(contentRef, pokemon, offset + i + 1);
    });
    
    offset += LIMIT;
    animatedArea.style.display = 'none';
}

function renderFilteredMon(filteredPokemon) {
    let contentRef = document.getElementById('content');
    
    filteredPokemon.slice(offset, offset + LIMIT).forEach(pokemon => {
        addPokemonToContent(contentRef, pokemon, pokemon.id);
    });
    
    offset += LIMIT;
    animatedArea.style.display = 'none'; 
}

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

function loadMore() {
    animatedArea.style.display = 'block'; 
    setTimeout(() => {
        renderMonEntrys(); 
        animatedArea.style.display = 'none'; 
    }, 1000); 
}

function filterPokemon() {
    let searchTerm = document.getElementById('search').value.toLowerCase();
    offset = 0; 
    document.getElementById('content').innerHTML = '';
    if (searchTerm.length < 3) {
        searchTerm.length === 0 ? renderMonEntrys() : null;
        return;
    }
    let filteredPokemon = allPokemon.filter(pokemon => pokemon.name.toLowerCase().includes(searchTerm));
    filteredPokemon.length === 0 
        ? document.getElementById('content').innerHTML = '<h3>LEIDER, LEIDER NICHTS GEFUNDEN =(</h3>' 
        : renderFilteredMon(filteredPokemon);
}

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
    }, 700);
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
    }, 700);
}




