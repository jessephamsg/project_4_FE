//DEPENDENCIES
import React from 'react';

//COMPONENTS
import GameCardForParent from '../../common/components/Card/ParentGameCard';

//STYLES
import './style_module.css'


const RecentGames = (props) => {

    return (
        <div className='gameCard_section'>
            {props.recentGameObjects.map(game => {
                return (
                    <GameCardForParent game={game} key={game._id} />
                )
            })}
        </div>
    )
}

export default RecentGames;