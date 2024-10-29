function getPokeTemplates(name) {

    return `
        <div class="pokeCard">
            <div class="cardHeader">
                <h3>${name}</h3>
            </div>

            <div class="pokeImgArea">
                <img class="pokeImg" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png">
            </div>

            <div class="pokeInfoArea" id="pokeInfoArea">
                <img class="infoIcon" src="./assets/img/testIcon.png">
            </div>
        </div>`
}

function getPokeInfoTemplates(color, name) {

    return `
        <div class="colorTest" ${color[a],name}>
        
        </div>`
}