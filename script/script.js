const pokeColor = {
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



async function init() {
    await getData(); 
}

async function getData() {
    await fetchThemAll(); 
    await fetchDetailForAll();
}

// get and interpret data

function getColor(monId) {
    const mon = monDetail[monId - 1]; 
    
    if (!mon || !mon.types || mon.types.length === 0) {
        console.warn(`Keine Typeninformationen für Pokémon mit ID ${monId} gefunden.`);
        return;
    }

    const types = mon.types.map(typeInfo => typeInfo.type.name);
    const validTypes = types.filter(type => pokeColor[type]);

    if (validTypes.length === 0) {
        console.warn(`Keine gültigen Farbtypen für Pokémon mit ID ${monId} gefunden.`);
        return; 
    }

    const backgroundColor = validTypes.map(type => pokeColor[type])[0] || "rgb(206, 206, 206)";

    const cardInner = document.querySelector(`.card-inner[data-pokemon-id="${monId}"]`);
    if (cardInner) {
        cardInner.style.backgroundColor = backgroundColor;

        const cardFront = cardInner.querySelector('.card-front');
        if (cardFront) {
            cardFront.style.backgroundColor = backgroundColor; 
        } else {
            console.warn(`card-front Element für Pokémon mit ID ${monId} nicht gefunden.`);
        }
    } else {
        console.warn(`Element für Pokémon mit ID ${monId} nicht gefunden.`);
    }
}

async function fetchDetailForAll() {
    for (let i = 1; i <= pokeTotal.length; i++) {
        await fetchDetail(i); 
    }
}

async function fetchThemAll() {
    let animatedArea = document.getElementById('animatedArea');
    animatedArea.style.display = 'grid';

    let response = await fetch(BASE_URL); 
    let responseMon = await response.json();
    const results = responseMon.results;

    pokeTotal = []; 
    for (let i = 0; i < results.length; i++) {
        monToArray(results, i); 
    }
    renderMonEntrys(); 
    animatedArea.style.display = 'none';
}

async function fetchDetail(pokemonId) {
    try {
        if (pokemonId === undefined) {
            throw new Error("Pokemon-ID ist undefined");
        }

        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`);
        if (!response.ok) {
            throw new Error(`HTTP-Fehler beim Abrufen der Pokémon-Daten! Status: ${response.status}`);
        }
        let pokemonData = await response.json();

        let speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`);
        if (!speciesResponse.ok) {
            throw new Error(`HTTP-Fehler beim Abrufen der Spezies-Daten! Status: ${speciesResponse.status}`);
        }
        let speciesData = await speciesResponse.json();

        monDetail[pokemonId - 1] = {
            ...pokemonData,
            flavor_text_entries: speciesData.flavor_text_entries,
            color: speciesData.color,
            types: pokemonData.types, 
        };
        renderBackSide(pokemonId);
        await getColor(pokemonId);
    } catch (error) {
        console.log('Fehler beim Abrufen der Details:');
    }
}

function monToArray(results, index) {
    pokeTotal[index] = results[index]; 

}

function detailToArray (results, a) {
    monDetail.push(results[a]);
    console.log(monDetail);
}

//load Page one

async function renderMonEntrys() {
    document.documentElement.scrollTop = 0;
    let contentRef = document.getElementById('content');
    contentRef.innerHTML = ""; 

    for (let i = 0; i < 250; i++) {
        let name = pokeTotal[i].name;
        let id = i + 1; 
        contentRef.innerHTML += getPokeTemplates(name, id, id);
        
        await getColor(id);
    }
}

//load Page two

function loadPageTwo() {
    document.getElementById('content').innerHTML = "";
    renderMonEntrys2();
    showButton();
    hideButton();
    document.documentElement.scrollTop = 0;
}

async function renderMonEntrys2() {
    document.documentElement.scrollTop = 0;
    let animatedArea = document.getElementById('animatedArea');
    animatedArea.style.display = 'grid';

    let contentRef = document.getElementById('content');
    contentRef.innerHTML = ""; 

    for (let i = 251; i < 500; i++) {
        let name = pokeTotal[i].name; 
        let id = i + 1; 
        contentRef.innerHTML += getPokeTemplates(name, id, id);
    
        await getColor(id); 
        await new Promise(resolve => setTimeout(resolve, 0));
    }

    animatedArea.style.display = 'none';
}

//load page three

async function renderMonEntrys3() {
    document.documentElement.scrollTop = 0;
    let animatedArea = document.getElementById('animatedArea');
    animatedArea.style.display = 'grid';

    let contentRef = document.getElementById('content');
    contentRef.innerHTML = ""; 

    for (let i = 501; i < 750; i++) {
        let name = pokeTotal[i].name; 
        let id = i + 1; 
        contentRef.innerHTML += getPokeTemplates(name, id, id);
    
        await getColor(id); 
        await new Promise(resolve => setTimeout(resolve, 0));
    }

    animatedArea.style.display = 'none';
}

//load page four

async function renderMonEntrys4() {
    document.documentElement.scrollTop = 0;
    let animatedArea = document.getElementById('animatedArea');
    animatedArea.style.display = 'grid';

    let contentRef = document.getElementById('content');
    contentRef.innerHTML = ""; 

    for (let i = 751; i < 1025; i++) {
        let name = pokeTotal[i].name; 
        let id = i + 1; 
        contentRef.innerHTML += getPokeTemplates(name, id, id);
    
        await getColor(id); 
        await new Promise(resolve => setTimeout(resolve, 0));
    }

    animatedArea.style.display = 'none';
}

//load Card Back Side

function renderBackSide(monId) {
    let contentRef = document.getElementById(`card-back-${monId}`);
    contentRef.innerHTML = "";

    if (!monDetail || monDetail.length === 0) {
        return;
    }

    const flavorTextEntries = monDetail[monId - 1]?.flavor_text_entries;
    const englishFlavorText = flavorTextEntries?.find(entry => entry.language.name === 'en');

    if (englishFlavorText) {
        let info = englishFlavorText.flavor_text
            .replace(/\u000C/g, ' ').trim(); 
        contentRef.innerHTML += getBackSideTemplate(info);
    } else {
        console.error('Englischer Flavor-Text nicht gefunden');
    }
}
    


