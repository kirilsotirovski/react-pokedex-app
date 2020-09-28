import React, {useState, useEffect} from 'react'
import { motion } from "framer-motion";

import Card from './Card'

const CardList = ({pokemons, offset}) => {
    const [selectedId, setSelectedId] = useState(null);
    const [clickedPokemon, setClickedPokemon] = useState({});

        useEffect(() => {
            if(selectedId !== null) {
                const fetchPokemon = async () => {
                    const getPokemon = async id => {
                        const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
                        const res = await fetch(url);
                        const pokemonObj = await res.json();
                        return pokemonObj;
                    };
                    const desc =  await getPokemon(selectedId);
                    console.log(desc);
                    setClickedPokemon(desc);
                }
                fetchPokemon();
            }
        }, [selectedId])

        const {id, name, abilities = [], types = [], moves = [], stats = []} = clickedPokemon;

    return (
        <React.Fragment>
            <div className="container">
                {pokemons && pokemons.map((pokemon, index) => (
                    <Card setSelectedId={setSelectedId} delay={index * 100} key={index+1} id={pokemon.id} pokemons={pokemons} pokemon={pokemon} />
                ))} 
            </div>
                
                { selectedId && 
                <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className="backdrop">
                    <motion.div initial={{scale: 0}} animate={{scale: 1}} className={`clash-card ${types.length > 0 && types[0].type.name}`}>
                        <button onClick={() => setSelectedId(null)}><ion-icon name="close-circle-outline"></ion-icon></button>
                        <div className={`clash-card__image`}>
                            <img src={`https://pokeres.bastionbot.org/images/pokemon/${id}.png`} alt="test" />
                        </div>
                        <div className={`clash-card__level clash-card__level--${types.length > 0 && types[0].type.name}`}>
                            {types.map((type, index) => index !== types.length - 1 ? type.type.name + ', ' : type.type.name)}
                        </div>
                        <div className="clash-card__unit-name">{name}</div>
                        <div className="clash-card__unit-description">
                            <h5>ABILITIES</h5>  
                            {abilities.map((ability, index) => <span key={index}>{ability.ability.name}</span>)}
                        </div>
                        <div className="clash-card__unit-description">
                            <h5>MOVES</h5>
                            {moves.slice(0,9).map((move, index) => <span key={index}>{move.move.name}</span>)}
                        </div>

                        <div className={`clash-card__unit-stats clash-card__unit-stats--${types.length > 0 && types[0].type.name} clearfix`}>
                            {
                                stats.map((stat, index) => (
                                    <motion.div key={index} className="one-third">
                                        <div className="stat">{stat.base_stat}</div>
                                        <div className="stat-value">{stat.stat.name}</div>
                                    </motion.div>
                                ))
                            }

                        </div>
                    </motion.div>
                </motion.div>
            }
        </React.Fragment>
    )
}

export default CardList
