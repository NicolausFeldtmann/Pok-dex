
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
    loadMore()
}

async function fetchFirstFew() {
    try { for (let i = 1; i <= 40; i++) { 
            let response = await fetch(DETAIL_URL_BASE + i + "/");
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            let responseMon = await response.json();
            allPokemon.push(responseMon);
        }
        loadingComplete = true; 
        if (allPokemon.length > 39) {
            renderMonEntrys(); 
        }
        document.getElementById('search').addEventListener('input', filterPokemon); 
    } catch (error) { console.error("Fehler beim Abrufen der Pokémon-Daten:", error); }
}

async function fetchThemAll() {
    let fetchPromises = [];
    try {
        for (let i = 1; i < 1026; i++) { 
            fetchPromises.push(
                fetch(DETAIL_URL_BASE + i + "/").then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
            );
        }
        let results = await Promise.all(fetchPromises);
        allPokemon.push(...results);
        loadingComplete = true; 
        if (allPokemon.length > 0) {
            renderMonEntrys(); 
        }
    } catch (error) {
        console.error("Fehler beim Abrufen der Pokémon-Daten:", error);
    }
}

async function renderMonEntrys() {
    animatedArea.style.display = 'block';
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
    const moves = pokemon.moves.slice(0, 3).map(m => m.move.name).join(", ");
    const stats = pokemon.stats.map(s => `${s.stat.name}: ${s.base_stat}`).join(", ");
    const abilities = pokemon.abilities.map(a => a.ability.name).join(", ");
    const moveLines = moves.split(', ').map(move => `<p>${move}</p>`).join('');
    const statsLines = stats.split(', ').map(stat => `<p>${stat}</p>`).join('');
    const abiLines = abilities.split(', ').map(ability => `<p>${ability}</p>`).join('');
    contentRef.innerHTML += getPokeTemplate(
        pokemon.name,
        abiLines,
        id,
        pokemon.types[0].type.name,
        colorPoke[pokemon.types[0].type.name],
        moveLines,
        statsLines
    );
}

function loadMore() {
    animatedArea.style.display = 'block'; 
    setTimeout(() => {
        renderMonEntrys(); 
        animatedArea.style.display = 'none'; 
    },); 
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

function toggleFlip(card, id) {
    card.classList.toggle('flipped');
    let blurEffect = document.querySelector('.blur-effect');
    
    if (id === 1) {
        dieGrey();
    }
    
    if (card.classList.contains('flipped')) {
        blurEffect.style.display = 'block';
        document.body.style.overflow = 'hidden'; 
    } else {
        blurEffect.style.display = 'none';
        document.body.style.overflow = 'auto'; 
    }
}

function backFlip(card, id) {
    if (id === 1) {
        alert("Es gibt keine vorherige Karte.");
        return; 
    }
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

async function frontFlip(card, id) {
    toggleFlip(card);
    setTimeout(async () => {
        let nextCard = document.querySelector(`.pokeCard[data-id="${id + 1}"]`);
        if (!nextCard && id < 1025) { await loadMorePokemon();
            setTimeout(() => { nextCard = document.querySelector(`.pokeCard[data-id="${id + 1}"]`);
                if (nextCard) {
                    toggleFlip(nextCard);
                }
            }, 500);
        } else if (nextCard) {
            toggleFlip(nextCard);
        }
    }, 700);
}

function dieGrey() {
    let arrowLeft = document.getElementById('arrowLeft');
    let boxLeft = document.getElementById('boxLeft');
    if (arrowLeft) {
        arrowLeft.style.borderTopColor = 'grey'; 
        arrowLeft.classList.add('arrowLeftGrey');
        console.log('Arrow left styled grey');
    } else {
        console.warn('ArrowLeft element not found!');
    }
    if (boxLeft) {
        boxLeft.style.backgroundColor = '#c9c9c9'; 
        console.log('Box left styled grey');
    } else {
        console.warn('BoxLeft element not found!');
    }
}
