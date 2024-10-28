
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