//DEPENDENCIES
import React from 'react'

//COMPONENT
import AllGames from '../../common/components/AllGamesSection';

//STYLES
import './style_module.css';


const GameCardSection = () => {

    return (
        <div className='gameList-wrapper-landing' id='games'>
            <h3>Our games</h3>
            <div className='gameList_parent_landing'>
                <AllGames />
            </div>
        </div>
    )
}

export default GameCardSection;