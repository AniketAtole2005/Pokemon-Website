import React, { useEffect, useState } from 'react'
import "./Pokemon.css"
import PokemonCard from './PokemonCard'

function Pokemon() {
    const API = "https://pokeapi.co/api/v2/pokemon?limit=124"

    const [pokemon,setPokemon] =useState([])
    const [loading,setLoding] = useState(true)
    const [error,setError] = useState("")
    const[search,setSearch]=useState("")

const fetchPokemon = async ()=>{
    try {
        const res = await fetch(API);
        const data = await res.json();
        // console.log(data);
        const pokemonDetailedData = data.results.map( async(curPokemon)=>{
             const res = await fetch(curPokemon.url);
             const data = await res.json(); 
            return data
             
        });
        // console.log(pokemonDetailedData)
        const detailedResponse = await Promise.all(pokemonDetailedData)
        console.log(detailedResponse);
        setPokemon(detailedResponse)
        setLoding(false)
 }
    catch (error) {
        console.log(error);
        setLoding(false)
        setError(error);
    }
}

    useEffect(()=>{
        fetchPokemon();
    },[])

    const searchData = pokemon.filter((curPokemon)=>curPokemon.name.toLowerCase().includes(search.toLocaleLowerCase()))

    if(loading){
        return(
            <div>
                <h1>
                    Loading...
                </h1>
            </div>
        )
    }

    if(error){
        return(
            <div>
                <h1>
                    {error.message}
                </h1>
            </div>
        )
    }
  
    return (
    <>
    <section className='container'>
        <header>
            <h1>Lets Catch Pokemon</h1>
        </header>

        <div className='pokemon-search'>
            <input type='text' placeholder='Search Pokemon' value={search} onChange={(e)=>setSearch(e.target.value)}/>
        </div>

        <div>
        <ul className='cards'>
           {
            // 
            searchData.map((curPokemon)=>{
                return <PokemonCard key={curPokemon.id} pokemonData={curPokemon}/>
            })
           }
        </ul>
        </div>
    </section>
    </>
  )
}

export default Pokemon
