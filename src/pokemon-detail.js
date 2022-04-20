import React from "react";

import { fetchPokemon, suspensify } from "./api";

let initialPokemon = suspensify(fetchPokemon(1));

function DelaySpinner() {
  return (
    <span role="img" aria-label="spinner" className="DelaySpinner">
      <style>{`
        .DelaySpinner {
          animation: rotation 1.5s infinite linear;
          display: inline-block;
          font-size: .7rem
        }

        @keyframes rotation {
          from { transform: rotate(0deg) }
          to { transform: rotate(359deg) }
        }
      `}</style>
      🌀
    </span>
  );
}

export default function PokemonDetail() {
  let [pokemonResource, setPokemonResource] = React.useState(initialPokemon);
  const [isPending, startTransition] = React.useTransition({ timeoutMs: 3000});
let pokemon = pokemonResource.read();

  return (
    <div>
      <div>{pokemon.name} {isPending && <DelaySpinner />}</div>

      <button
        type="button"
        // Dont want to use the button again until the next pokemon comes
        disabled={isPending}
        onClick={() =>
          startTransition(() =>
            setPokemonResource(suspensify(fetchPokemon(pokemon.id + 1)))
          )
        }
      >
        Next 
      </button>
    </div>
  );
}
