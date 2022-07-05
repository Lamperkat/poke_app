import React, { useEffect, useMemo, useRef, useState } from 'react';
import PokemonThumbnail from './Components/PokemonThumbnail';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [loadPoke, setLoadPoke] = useState(
    'https://pokeapi.co/api/v2/pokemon?limit=20'
  );
  const getAllPokemons = async () => {
    const res = await fetch(loadPoke);
    const data = await res.json();
    setLoadPoke(data.next);

    function createPokemonObject(result) {
      result.forEach(async (pokemon) => {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        );
        const data = await res.json();
        console.log(data);
        setPokemons((currentList) => [...currentList, data]);
      });
    }
    createPokemonObject(data.results);
  };
  const [name, setName] = useState('');
  useEffect(() => {
    getAllPokemons();
  }, []);
  const handleSearch = (e) => {
    const name = e.target.value
    setName(name);
  };

  const viewPokemons = useMemo(() => {
    if (!name) return pokemons
    return pokemons.filter((poke) => {
      if (poke.name.toLowerCase().includes(name.toLowerCase())) {
        return true;
      } 
      return false
    });
  }, [name, pokemons])

  return (
    <div className="app-container">
      <h1>Pokemon Kingdom .</h1>

      <div className="pokemon-container">
        <form onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="name">search pocemons</label>
          <input id="name" value={name} onChange={handleSearch} />
        </form>
        <div className="all-container">
          {viewPokemons.map((pokemon, index) => (
            <PokemonThumbnail
              id={pokemon.id}
              name={pokemon.name}
              image={pokemon.sprites.other.dream_world.front_default}
              type={pokemon.types[0].type.name}
              key={index}
              height={pokemon.height}
              weight={pokemon.weight}
              stat1={pokemon.stats[0].stat.name}
              stat2={pokemon.stats[1].stat.name}
              stat3={pokemon.stats[2].stat.name}
              stat4={pokemon.stats[3].stat.name}
              stat5={pokemon.stats[4].stat.name}
              stat6={pokemon.stats[5].stat.name}
              bs1={pokemon.stats[0].base_stat}
              bs2={pokemon.stats[1].base_stat}
              bs3={pokemon.stats[2].base_stat}
              bs4={pokemon.stats[3].base_stat}
              bs5={pokemon.stats[4].base_stat}
              bs6={pokemon.stats[5].base_stat}
            />
          ))}
        </div>
        <button className="load-more" onClick={() => getAllPokemons()}>
          More Pokemons
        </button>
      </div>
    </div>
  );
}

export default App;
