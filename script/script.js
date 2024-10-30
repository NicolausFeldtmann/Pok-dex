
async function init() {
    getData();
}

function getData() {
    fetchThemAll();
}

function renderMonEntrys() {
    let contentRef = document.getElementById('content');
    contentRef.innerHTML ="";

    for(let i = 0; i < pokeTotal.length; i++) {
        let name = pokeTotal[i].name;
        console.log(name);

        contentRef.innerHTML += getPokeTemplates(name, `${i + 1}`, i);
    }
}

async function fetchThemAll() {
    let response = await fetch(BASE_URL);
    let responseMon = await response.json();
    
    const results = responseMon.results;

    for (let i = 0; i < results.length; i++) {
        monToArray(results, i);
    }
    renderMonEntrys();
}

function monToArray (results, i) {
    pokeTotal.push(results[i]);
}
