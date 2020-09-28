import React from 'react'

import logo from '../images/pokemon-logo-black-transparent.png'

const Nav = () => {
    return (
        <nav>
            <img style={logoStyle} src={logo} alt="pokemon"/>
        </nav>
    )
}

const logoStyle = {
    display: 'block',
    width: '100%',
    maxWidth: '400px',
    margin: '20px auto'
}

export default Nav
