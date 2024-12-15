function getPokeTemplate(name, abilities, id, type, backgroundColor, moves, stats) {
    let moveLines = moves.split(', ').map(move => `<p>${move}</p>`).join('');
    let statsLines = stats.split(', ').map(stat => `<p>${stat}</p>`).join('');
    let abiLines = abilities.split(', ').map(ability => `<p>${ability}</p>`).join('');
    
    return `
        <div class="pokeCard" data-id="${id}">
            <div class="cardInner" style="background-color: ${backgroundColor};">
                <div class="cardFront" style="background-color: ${backgroundColor};">
                    <div class="card-nav">
                        <h4>#${id}</h4>
                        <h6>${type}</h6>
                    </div>
                    <div class="cardHeader">
                        <h3>${name}</h3>
                    </div>
                    <div class="pokeImgArea">
                        <img class="pokeImg" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png" alt="${name}">
                    </div>
                    <div class="abs">
                        <h6>ABILITIES:</h6>
                        <div>${abiLines}</div>
                    </div>
                    <div class="cardFrontFooter">
                        <button onclick="toggleFlip(this.closest('.pokeCard'))">INFO</button>
                    </div>
                </div>
                <div class="cardBack">
                    <div class="cardBackNav">
                        <img class="xIcon" src="./assets/img/x.png" onclick="toggleFlip(this.closest('.pokeCard'))">
                    </div>
                    <div class="backHead">
                        <h4>#${id}</h4>
                        <div class="cardHeader">
                            <h3>${name}</h3>
                        </div>
                    </div>
                    <div id="cardBack-${id}"></div>
                    <div class="attacks">
                        <h6>ATTACKS:</h6>
                        <div>${moveLines}</div>
                    </div>
                    <div class="stats">
                        <h6>STATS:</h6>
                        <div>${statsLines}</div>
                    </div>
                    <div class="cardFooter">
                        <div class="arrowBox">
                            <div class="arrowLeft" onclick="backFlip(this.closest('.pokeCard'), ${id})"></div>
                        </div>
                        <div class="arrowBox">
                            <div class="arrowRight" onclick="frontFlip(this.closest('.pokeCard'), ${id})"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}