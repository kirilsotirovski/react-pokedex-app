import React from 'react'

import pokeball from '../images/pokeball.gif'

const Spinner = () => {
    return (
        <div style={{height: 'calc(100vh - 151.5px)', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <img src={pokeball} alt="pokeball"/>
        </div>
    )
}

export default Spinner
