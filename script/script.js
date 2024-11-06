
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

//load Page two

function loadPageTwo() {
    fetchTheRest();
    showButton();
    hideButton();
    console.log("lade...");
    
}

async function fetchTheRest() {
    let response = await fetch(SECUNDARY_URL);
    let responseMon = await response.json();
    
    const results = responseMon.results;

    for (let i = 0; i < results.length; i++) {
        monToASecundArray(results, i);
    }
    renderMonEntrys2()
}

function renderMonEntrys2() {
    let contentRef = document.getElementById('content');
    contentRef.innerHTML ="";

    for(let i = 0; i < pokeTotal2.length; i++) {
        let name = pokeTotal2[i].name;

        contentRef.innerHTML += getPokeTemplates(name, `${i + 1}`, i);
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
