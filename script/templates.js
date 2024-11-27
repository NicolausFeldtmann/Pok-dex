function getPokeTemplates(name, number, id) {
    return `
        <div class="pokeCard" onclick="this.classList.toggle('flipped'); console.log('Clicked Pokémon ID:', ${id}); fetchDetail(${id})">
            <div class="card-inner" data-pokemon-id="${id}">
                <div class="card-front">
                    <h4>#${number}</h4>
                    <div class="cardHeader">
                        <h3>${name.charAt(0).toUpperCase() + name.slice(1)}</h3>
                    </div>
                    <div class="pokeImgArea">
                        <img class="pokeImg" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png">
                    </div>
                </div>
                <div class="card-back">
                    <div id="card-back-${id}"></div>
                </div>
            </div>
        </div>
    `;
}

function getPokeTemplates2(name, number, id) {

    return `
        <div class="pokeCard" onclick="this.classList.toggle('flipped')">
            <div class="card-inner">
                <div class="card-front">
                    <h4>#${number}</h4>
                    <div class="cardHeader">
                        <h3>${name}</h3>
                    </div>
                    <div class="pokeImgArea">
                        <img class="pokeImg" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id + 501}.png">
                    </div>
                </div>
                <div class="card-back">
                    <h4>Details über ${name}</h4>
                    <p>Bin noch  nicht so ganz sicher wie ich das Hier füllen kann.</p>
                </div>
            </div>
        </div>`;
}

function getBackSideTemplate(info) {
    return `
        <h5>${info}</h5>
    `;
}
