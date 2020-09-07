//DEPENDENCIES
import React, { Component, Fragment } from 'react'

//COMPONENT
import GameCardForParent from '../../common/components/Card/ParentGameCard';

//INTERACTION LOGICS
import GameInteractions from '../../../interactions/ManageGames';

//STYLES
import './style_module.css';



class GameCardSection extends Component {

    constructor(props) {
        super(props)
        this.state = {
            gameList: null
        }
    }

    getAllGames = async () => {
        const gameList = await GameInteractions.getGames.getAllGames();
        this.setState({gameList});
    }

    componentDidMount () {
        this.getAllGames();
    }

    render () {
        if(this.state.gameList === null) {
            return (
                <div>
                    loading screen
                </div>
            )
        }
        return (
            <div className='gameList-wrapper-landing' id='games'>
                <h3>Our games</h3>
                    <div className='gameList_parent_landing'>
                        {this.state.gameList.map((game) => {
                            return (
                                <GameCardForParent game={game} key={game._id} />
                                )
                            }
                        )}
                    </div>
            </div>
        )
    }
}

export default GameCardSection;