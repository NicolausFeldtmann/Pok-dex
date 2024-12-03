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

let pokeDetailTest = [];

async function fetchThemAllTest() {
    for (let i = 1; i <= 151; i++) {
        let response = await fetch(DETAIL_URL_BASE + i + "/");
        let responseMon = await response.json();
        monToTest(responseMon);
    }
    renderTestEntries();
    animatedArea.style.display = 'none';
}

function monToTest(result) { 
    pokeDetailTest.push(result);
    console.log(pokeDetailTest);
}

function renderTestEntries() {
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
        let abilities = pokemon.abilities.map(ability => ability.ability.name).join(", "); 
        let backgroundColor = colorPoke[typeName];
        let moves = pokemon.moves.slice(0, 3).map(move => move.move.name).join(", ");
        let stats = pokemon.stats.map(stat => `${stat.stat.name}: ${stat.base_stat}`).join(", ");

        contentRef.innerHTML += getTestTemplate(name, abilities, id, typeName, backgroundColor, moves, stats);
    }
}

function getTestTemplate(name, abilities, id, type, backgroundColor, moves, stats) {

    const moveLines = moves.split(', ').map(move => `<p>${move}</p>`).join('');
    const statsLines = stats.split(', ').map(stat => `<p>${stat}</p>`).join('');
    const abiLines = abilities.split(', ').map(ability => `<p>${ability}</p>`).join('');

    return `
        <div class="pokeCard" onclick="this.classList.toggle('flipped'); fetchDetail(${id})">
            <div class="card-inner" style="background-color: ${backgroundColor};" data-pokemon-id="${id}">
                <div class="card-front" style="background-color: ${backgroundColor};">
                    <div class="card-nav">
                        <h4>#${id}</h4>
                        <h6>${type}</h6>
                    </div>
                    <div class="cardHeader">
                        <h3>${name.charAt(0).toUpperCase() + name.slice(1)}</h3>
                    </div>
                    <div class="pokeImgArea">
                        <img class="pokeImg" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png" alt="${name}">
                    </div>
                        <div class="abs">
                            <h6>ABILITIES:</h6>
                            <div>${abiLines}</div>
                        </div>
                </div>
                <div class="card-back">
                
                    <div id="card-back-${id}"></div>
                        <div class="attacks">
                            <h6>ATTACKS:</h6>
                            <div>${moveLines}</div>
                        </div>
                        <div class="stats">
                            <h6>STATS:</h6>
                            <div>${statsLines}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function calculateSomething() {
    console.log(number);
}

let number = 1;
calculateSomething();