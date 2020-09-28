import React, {useEffect} from 'react'

const Search = ({searchString, setSearchString, searchPokemons, setSearchPokemons}) => {
    const searchValue = (e) => {
        setSearchString(e.target.value);
    }
    useEffect(() => {
        searchString !== '' ? setSearchPokemons(searchPokemons.filter(sp => sp.name.includes(searchString))) : setSearchPokemons(searchPokemons);
    },[searchString, setSearchPokemons, searchPokemons])

    return (
        <form onSubmit={(e)=>{e.preventDefault()}}>
            <div>
                {searchString !== '' && <span onClick={(e) => { setSearchString(''); e.target.parentElement.nextSibling.value = ''; }}><i className="material-icons">close</i></span>}
                <input onChange={searchValue} type="text" placeholder="Search for a Pokemon"/> 
            </div>
        </form>
    )
}

export default Search