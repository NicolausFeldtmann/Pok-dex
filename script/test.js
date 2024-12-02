const DETAIL_URL_BASE = "https://pokeapi.co/api/v2/pokemon/";

const colorPoke = {
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

let pokeDetailTest = []; // Nur einmal deklarieren

async function fetchThemAllTest() {
    for (let i = 1; i <= 151; i++) { // z.B. für die ersten 10 Pokémon
        let response = await fetch(DETAIL_URL_BASE + i + "/");
        let responseMon = await response.json();
        monToTest(responseMon); // Übergibt das gesamte `responseMon` Objekt an die Funktion
    }
    renderTestEntrys();
    animatedArea.style.display = 'none';
}

function monToTest(result) { 
    pokeDetailTest.push(result);
    console.log(pokeDetailTest);
}

function renderTestEntrys() {
    let contentRef = document.getElementById('content');
    contentRef.innerHTML = "";

    for (let i = 0; i < pokeDetailTest.length; i++) {
        let pokemon = pokeDetailTest[i];

        if (!pokemon || !pokemon.types || pokemon.types.length === 0) {
            console.warn(`Pokémon-Daten an Index ${i} sind ungültig oder haben keine Typen.`);
            continue; 
        }

        let name = pokemon.name;
        let id = i + 1;
        let typeName = pokemon.types[0].type.name; 
        let backgroundColor = colorPoke[typeName];

        contentRef.innerHTML += getTestTemplate(name, id, typeName, backgroundColor);
    }
}

function getTestTemplate(name, id, type, backgroundColor) {
    return `
        <div class="pokeCard" onclick="this.classList.toggle('flipped'); fetchDetail(${id})">
            <div class="card-inner" style="background-color: ${backgroundColor};" data-pokemon-id="${id}">
                <div class="card-front" style="background-color: ${backgroundColor};">
                    <div class="card-nav">
                        <h4>#${id}</h4>
                        <h5>${type}</h5>
                    </div>
                    <div class="cardHeader">
                        <h3>${name.charAt(0).toUpperCase() + name.slice(1)}</h3>
                    </div>
                    <div class="pokeImgArea">
                        <img class="pokeImg" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png" alt="${name}">
                    </div>
                </div>
                <div class="card-back">
                    <div id="card-back-${id}"></div>
                </div>
            </div>
        </div>
    `;
}

function calculateSomething() {
    console.log(number); // Hier muss `number` deklariert sein.
}

let number = 1; // `number` vor der Verwendung deklarieren
calculateSomething();