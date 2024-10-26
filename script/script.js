function init() {
    getData();
    renderMonEntrys();
}

function renderMonEntrys() {
    let contentRef = document.getElementById('content');
    contentRef.innerHTML ="";
    for (let i = 0; i < poke.length; i++) {
        let name = poke[i].name;
        contentRef.innerHTML += getPokeTemplates(name);
    }
}