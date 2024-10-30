function getPokeTemplates(name, id) {

    return `
        <div class="pokeCard">
            <div class="cardHeader">
                <h3>${name}</h3>
            </div>

            <div class="pokeImgArea">
                <img class="pokeImg" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png">
            </div>

            <div class="pokeInfoArea" id="pokeInfoArea">
                <img class="infoIcon" src="./assets/img/testIcon.png">
            </div>
        </div>`
}

