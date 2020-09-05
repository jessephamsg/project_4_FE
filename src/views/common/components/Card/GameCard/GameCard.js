//DEPENDENCIES
import React from 'react';

//STYLES
import './style_module.css'


const GameCard = (props) => {

    return (
        <div>
            <div className='gameCard'>
                <a href={`/child/${props.childname}/game/${props.game.name}`}>
                    <div className='game_icon_container'>
                        <img className='gameIcon' src={props.game.icon} alt={props.game.name} title={props.game.name} />
                    </div>
                    <h2> {props.game.displayName} </h2>
                </a>
            </div>
        </div>
    )

}

export default GameCard
