
async function init() {
    getData();
}

function renderMonEntrys() {
    let contentRef = document.getElementById('content');
    contentRef.innerHTML ="";

    for(let i = 0; i < pokeTotal.length; i++) {
        let name = pokeTotal[i].name;
        console.log(name);

        contentRef.innerHTML += getPokeTemplates(name);
    }
}

function renderInfoEntry() {
    let contentRef = document.getElementById('pokeInfoArea');
    contentRef.innerHTML ="";

    for (let a = 0; a < pokeInfo.length; a++) {
        let color = pokeInfo[a].color;
        let name = pokeInfo[a].name;

        contentRef.innerHTML += getPokeInfoTemplates(color, name)
    }
}