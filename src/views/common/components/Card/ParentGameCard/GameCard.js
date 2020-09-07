//DEPENDENCIES
import React from 'react';

//STYLES
import './style_module.css'


const GameCard = (props) => {
    return (
        <div className='gameCard_parent_content_wrapper'>
            <div className='gameCard_parent_wrapper'>
                    <div 
                        style = {{
                            backgroundImage: `url(${props.game.icon})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            height: '60%',
                            width: '100%'
                        }}
                    />
                    <div className='gameCard_parent_content'>
                        <h2> {props.game.displayName} </h2>
                        <p> Rating: {props.game.avgRating} </p>
                        <p> Developer: {props.game.developer} </p>
                    </div>
                    <div className='gameCard_parent_button'>
                        <button>
                            <a href={`/game/${props.game.name}`}>
                            View more
                            </a>
                        </button>
                    </div>
            </div>
        </div>
    )
}

export default GameCard;