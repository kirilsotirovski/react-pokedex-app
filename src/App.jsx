import React, { useState, useEffect } from 'react'
import './App.css';

import Nav from './components/Nav'
import CardList from './components/CardList'
import Spinner from './components/Spinner';
import Search from './components/Search';

const App = () => {

    const [loading, setLoading] = useState(true);
    const [pokemons, setPokemons] = useState([]);
    const [index, setIndex] = useState(0);
    const [offset, setOffset] = useState(18);
    const [searchString, setSearchString] = useState('');
    const [paginated, setPaginated] = useState([]);
    const [filteredPokemons, setFilteredPokemons] = useState([]);

    useEffect(() => {
        let pokemonsArray;
        const fetchPokemons = async () => {
            const getPokemon = async () => {
                const url = `https://pokeapi.co/api/v2/pokemon?limit=1050`;
                const res = await fetch(url);
                const pokemonObj = await res.json();
                return pokemonObj;
            };
            pokemonsArray = await getPokemon();
            pokemonsArray = pokemonsArray.results.map((ob, i) => ({...ob, id: i+1}))
            console.log(pokemonsArray);
            
            setPokemons(pokemonsArray);
            setFilteredPokemons(pokemonsArray);
            setTimeout(function() {
                setLoading(false);
            }, 800);
        }
        fetchPokemons();
    }, [])

    useEffect(() => {
        setPaginated(filteredPokemons.slice(index, offset));
        setTimeout(function() {
            setLoading(false);
        }, 800);
    }, [searchString, filteredPokemons, index, offset])

    const scrollTop = () =>{
        window.scrollTo({top: 0, behavior: 'smooth'});
     };

    const prevPage = () => {
        setLoading(true); 
        if(index > 0) { setIndex(index - 18); } else { setIndex(0); setLoading(false); } 
        if(offset > 18) {setOffset(offset-18)} else {setOffset(18);  setLoading(false);} 
        scrollTop();
    }

    const nextPage = () => {
        setLoading(true); 
        setIndex(index + 18); 
        setOffset(offset+18); 
        scrollTop();
    }

    return (
        <React.Fragment>
            <Nav></Nav>
            <Search searchString={searchString} setSearchString={setSearchString} searchPokemons={pokemons} setSearchPokemons={setFilteredPokemons}></Search>
            { loading ? <Spinner /> : <CardList offset={index} pokemons={paginated} /> }
            { 
                loading ? '' : 
                <div className="button-container">
                    <button onClick={prevPage}>
                        <span>Previous</span>
                    </button>
                    <button onClick={nextPage}>
                        <span>Next</span>
                    </button>
                </div> 
            }
        </React.Fragment>
    )
}

export default App
