function getPokeTemplates(name) {

    return `
        <div class="pokeCard">
            <div class="cardHeader">
                <h3>${name}</h3>
            </div>

            <div class="pokeImgArea">
                <img class="pokeImg" src="./assets/img/pokeTestMon.png">
            </div>

            <div class="pokeInfoArea">
                <img class="infoIcon" src="./assets/img/testIcon.png">
            </div>
        </div>`
}