
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    pokemon.url = pokeDetail.url

    pokemon.height = (pokeDetail.height / 10).toFixed(2) + "m"
    pokemon.weight = (pokeDetail.weight / 10).toFixed(2) + "Kg"

    pokemon.abilities = pokeDetail.abilities.map((ablt) => ablt.ability.name)

    pokemon.stats = pokeDetail.stats.map((stats) => {
        const stat = {
            baseStat: stats.base_stat,
            nameStat: stats.stat.name
        }
        return stat
    })
    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}

pokeApi.getPokemonWithDetails = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Erro ao obter os detalhes do Pokémon.');
        }
        const jsonBody = await response.json();
        return convertPokeApiDetailToPokemon(jsonBody);
    } catch (error) {
        console.error('Erro:', error);
        throw error;
    }
}