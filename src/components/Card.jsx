import React from 'react'

const Card = ({pokemon, delay, id, setSelectedId}) => {

    const pokemonThumbnail = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
    const addDefaultSrc = (e) => {
        e.target.src = 'https://www.shareicon.net/data/512x512/2016/08/05/807319_gaming_512x512.png';
    }
    return (
            <div onClick={() => setSelectedId(id)} style={{animationDelay: `${delay}ms`}} className={`clash-card`}>
                <div className={`clash-card__image`}>
                    <img onError={addDefaultSrc} src={pokemonThumbnail} alt={pokemon.name} />
                </div>
    <div className="clash-card__unit-name">{pokemon.name}</div>
            </div>
    )
}

export default Card
