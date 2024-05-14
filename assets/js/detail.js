const pokemonArea = document.getElementById('pokemon')
const pokemonInfo = document.getElementById('pokemon-about')
const background = document.getElementById('sec-pd')

function goBack() {
    window.history.back();
}

function getIDFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

function convertPokemonToDetail(pokemon) {
    return `<div class="name-number">
                <span class="name">${pokemon.name}</span>
                <span class="number">#${pokemon.number}</span>
            </div>

            <div id="${pokemon.number}" class="detail">
                <ol class="types">
                ${pokemon.types.map((type) => `<li class="typeDetail ${type}">${type}</li>`).join('')}
                </ol>
            </div>
            <div class="photo">
                <img src="${pokemon.photo}"
                    alt="${pokemon.name}">
            </div>`
}


function statusPokemon(pokemon) {
    return `<div id="sec-info">
                <h3><strong>About</strong></h3>
                <div class="info">
                    <div class="titulos">
                        <span>Height</span>
                        <span>Weight</span>
                        <span>Abilities</span>
                    </div>
                    <div class="valores">
                        <span>${pokemon.height}</span>
                        <span>${pokemon.weight}</span>
                        <span style="text-transform:capitalize">${pokemon.abilities}</span>
                    </div>
                </div>
                <h3><strong>Stats</strong></h3>
                <div class="info">
                    <div class="titulos">
                        ${pokemon.stats.map((stat) => `<span>${stat.nameStat}</span>`).join('')}
                    </div>
                    <div class="valores">
                        ${pokemon.stats.map((stat) => `<span>${stat.baseStat}</span>`).join('')}
                    </div >
                </div >
            </div >`
}

pokeApi.getPokemonWithDetails(getIDFromURL())
    .then(pokemon => {
        background.classList.add(pokemon.type)
        pokemonArea.innerHTML += convertPokemonToDetail(pokemon)
        pokemonInfo.innerHTML += statusPokemon(pokemon)
    })
    .catch(error => {
        console.error('Erro ao obter detalhes do Pokémon:', error);
    });


