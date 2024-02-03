
const pokeApi = {}

function convertPokeApiDetailPokemon(pokeDetail){

    const pokemon = new Pokemon()

    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name
    
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default


    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
   return fetch(pokemon.url)
   .then((response) => response.json())
   .then(convertPokeApiDetailPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {

    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    //Retorna uma promise(Uma resposta ascincrono. sem resposta imediato. Uma promessa de resultado)
   return fetch(url)
    .then((response) => response.json()) //O que vai para o segundo "then" é sempre o retorno do primeiro "then"
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
    .then((detailRequest) => Promise.all(detailRequest))
    .then((pokemonsDetails) => pokemonsDetails)

}



