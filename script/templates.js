function getPokeTemplate(name, abilities, id, type, backgroundColor, moves, stats) {
    const moveLines = moves.split(', ').map(move => `<p>${move}</p>`).join('');
    const statsLines = stats.split(', ').map(stat => `<p>${stat}</p>`).join('');
    const abiLines = abilities.split(', ').map(ability => `<p>${ability}</p>`).join('');
    return `
        <div class="pokeCard" onclick="toggleFlip(this, ${id}, ${id - 1})">
            <div class="card-inner" style="background-color: ${backgroundColor};" data-pokemon-id="${id}">
                <div class="card-front" style="background-color: ${backgroundColor};">
                    <div class="card-nav">
                        <h4>#${id}</h4>
                        <h6>${type}</h6>
                    </div>
                    <div class="cardHeader">
                        <h3>${name.charAt(0).toUpperCase() + name.slice(1)}</h3>
                    </div>
                    <div class="pokeImgArea">
                        <img class="pokeImg" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png" alt="${name}">
                    </div>
                    <div class="abs">
                        <h6>ABILITIES:</h6>
                        <div>${abiLines}</div>
                    </div>
                </div>
                <div class="card-back">
                    <div class="backHead">
                        <h4>#${id}</h4>
                        <div class="cardHeader">
                            <h3>${name.charAt(0).toUpperCase() + name.slice(1)}</h3>
                        </div>
                    </div>
                    <div id="card-back-${id}"></div>
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
                            <div class="arrowLeaft"></div>
                        </div>
                        <div class="arrowBox">
                            <div class="arrowRigth"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}


function getBackSideTemplate(info) {
    return `
        <h5>${info}</h5>
    `;
}


