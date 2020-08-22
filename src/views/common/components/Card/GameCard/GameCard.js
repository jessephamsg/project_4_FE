import React, { Component } from 'react'
import './style_module.css'
import gamePic from '../../../assets/puzzlegame1.jpg'

export class GameCard extends Component {

    render() {
        return (
            <div className='gameCard'>
                
                <div className='img_container_square'>
                    <img src={gamePic} alt='gametitle' title=' gametitle'/> {/*game pic can be dynamic*/}
                </div>
                <a href={`/child/${this.props.childname}/game/${this.props.gameid}`}>
                    <h3>Gametitle1</h3>
                </a>
            </div>
                
        )
    }
}

export default GameCard
