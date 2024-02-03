
var button = document.getElementById('nome2')

const limit = 10;
let offset = 0;
const maxRecords = 151;


button.addEventListener('click', () => {
    
    
    const pokemonList = document.getElementById('pokemonList')
     
    pokemonList.classList.toggle("hide");
 
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

    const loadMoreButton = document.getElementById('loadMoreButton')

    if(loadMoreButton.style.display === "none"){
        loadMoreButton.style.display = "block"
    }else{
        loadMoreButton.style.display = "none"
    }

loadPokemomItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit 

    const qtdRecord = offset + limit 

    if(qtdRecord >= maxRecords){ 
        const newLimit =  maxRecords - offset 
        loadPokemomItens(offset, newLimit)

       loadMoreButton.parentElement.removeChild(loadMoreButton)
    }else {
        loadPokemomItens(offset, limit)

        
    }

    
})

})
