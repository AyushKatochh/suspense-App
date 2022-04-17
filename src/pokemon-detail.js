import  {useState} from "react";

import { fetchPokemon, suspensify } from "./api";

let iniitalPokemon = suspensify(fetchPokemon(1));


 function PokemonDetail() {
 const [pokemonResponse, setPokemonResponse] = useState(iniitalPokemon);
 let pokemon = pokemonResponse.read();

 return <div>
     {pokemon.name}
     <div>
         <button type="submit" onClick={setPokemonResponse(suspensify(fetchPokemon(pokemon.id + 1)))}>Next</button>
     </div>
 </div>
}

export default PokemonDetail;