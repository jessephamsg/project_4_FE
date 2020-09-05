//DEPENDENCIES
import React, { Component, Fragment } from 'react'

//COMMON COMPONENTS
import GameCard from '../../common/components/Card/GameCard'

//INTERACTION LOGICS
import GameInteractions from '../../../interactions/ManageGames'

//STYLES
import './style_module.css'

export class GamesPage extends Component {

    state = {
        gameslist: null
    }

    getAllGames = async () => {
        const result = await GameInteractions.getGames.getAllGames();
        console.log("result@getAllGames: ", result);
        this.setState({
            gameslist: result.length ? result : null
        })
        console.log("this.state.gameslist: ", this.state.gameslist)
    }

    componentDidMount() {
        this.getAllGames()
    }

    render() {
        return (
            <Fragment>
                <div className='gamesPage'>
                <h1>Hi {this.props.match.params.childname} :)</h1>
                    <div className='gameListing'>
                        {!this.state.gameslist ?
                            <h1>No games</h1>
                            :
                            this.state.gameslist.map((game) =>
                                <GameCard game={game} childname={this.props.match.params.childname} key={game._id} />
                            )}
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default GamesPage
