const pokeColor = {
    normal: "rgb(206, 206, 206)",
    fire: "rgb(255, 107, 107)",
    figthing: "rgb(255, 128, 0)",
    water: "rgb(41, 128, 239)",
    flying: "rgb(129, 185, 239)",
    grass: "rgb(124, 198, 107)",
    poisen: "rgb(150, 76, 206)",
    electic: "rgb(250, 192, 0)",
    ground: "rgb(150, 108, 78)",
    psych: "rgb(255, 79, 134)",
    rock: "rgb(150, 148, 132)",
    ice: "rgb(185, 234, 247)",
    bug: "rgb(177, 188, 90)",
    dragon: "rgb(0, 22, 196)",
    ghoust: "rgb(168, 26, 168)",
    dark: "rgb(71, 54, 54)",
    steel: "rgb(132, 166, 178)",
    fairy: "rgb(252, 169, 220)",
    stellar: "rgb(64, 181, 165)",
};

async function init() {
    
    await getData();

}

function getData() {
    fetchThemAll();
    fetchDetail();
}

function renderMonEntrys() {
    let contentRef = document.getElementById('content');
    contentRef.innerHTML = ""; 

    for (let i = 0; i < pokeTotal.length; i++) {
        let name = pokeTotal[i].name; 
        let id = i + 1; 
        contentRef.innerHTML += getPokeTemplates(name, id, id); 
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
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`); 
        if (!response.ok) {
            throw new Error(`HTTP-Fehler! Status: ${response.status}`);
        }

        let responseDetail = await response.json(); 
    
        monDetail[pokemonId - 1] = responseDetail; 
        
        renderBackSide(pokemonId); 
    } catch (error) {
        console.error('Fehler beim Abrufen der Details:');
    }
}

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
    

function monToArray(results, index) {
    pokeTotal[index] = results[index]; 

}

function detailToArray (results, a) {
    monDetail.push(results[a]);
    console.log(monDetail);
    
}

//load Page two

function loadPageTwo() {
    document.getElementById('content').innerHTML = "";
    fetchTheRest();
    showButton();
    hideButton();
    document.documentElement.scrollTop = 0;
}

async function fetchTheRest() {
    let animatedArea = document.getElementById('animatedArea');
    animatedArea.style.display = 'grid';

    let response = await fetch(SECUNDARY_URL);
    let responseMon = await response.json();
    
    const results = responseMon.results;

    for (let i = 0; i < results.length; i++) {
        monToASecundArray(results, i);
    }
    renderMonEntrys2();
    animatedArea.style.display = 'none';
}

function renderMonEntrys2() {
    let contentRef = document.getElementById('content');
    contentRef.innerHTML ="";

    for(let i = 0; i < pokeTotal2.length; i++) {
        let name = pokeTotal2[i].name;

        const number = pokeTotal.length + (i + 1);
        contentRef.innerHTML += getPokeTemplates2(name, number, i);
    }
}

function monToASecundArray(results, i) {
    pokeTotal2.push(results[i]);
}

function showButton() {
    var x = document.getElementById('back');
    x.classList.toggle('buttonShow');
}

function hideButton() {
    var x = document.getElementById('next');
    x.classList.toggle('buttonHide');
}

