const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
var button = document.getElementById('nome2')





const limit = 10;
let offset = 0;
const maxRecords = 151;






function loadPokemomItens (offset, limit){
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) =>  `
         <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}  
                    
                </ol>

            <img href="" src="${pokemon.photo}"
             alt="${pokemon.name}">        
            </div>
        </li>
    ` ).join('')
    pokemonList.innerHTML += newHtml
})  
 
}

button.addEventListener('click', () => {
    
    var divi = document.getElementById("continente")

    divi.classList.toggle("hide");
    
})




loadPokemomItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit // 10 + 5 

    const qtdRecord = offset + limit //20


    if(qtdRecord >= maxRecords){ // 20 / 18
        const newLimit =  maxRecords - offset // 18 - 15
        loadPokemomItens(offset, newLimit)

       loadMoreButton.parentElement.removeChild(loadMoreButton)
    }else {
        loadPokemomItens(offset, limit)
    }
    
})


