//DEPENDENCIES
import React, { Component, Fragment } from 'react';

//COMMON COMPONENTS
import GameCard from '../../common/components/Card/GameCard';
import LoadingScreen from '../LoadingPage';

//INTERACTION LOGICS
import GameInteractions from '../../../interactions/ManageGames';
import ChildProfileInteractions from '../../../interactions/ManageChildrenProfile';

//STYLES
import './style_module.css';


export class GamesPage extends Component {

    state = {
        gameslist: null,
        recentGames: []
    }

    getAllGames = async () => {
        const result = await GameInteractions.getGames.getAllGames();
        this.setState({
            gameslist: result.length ? result : null
        })
    }

    getRecentlyPlayedGames = async () => {
        const kidName = this.props.match.params.childname;
        const recentGames = await ChildProfileInteractions.getUser.getRecentStats(kidName);
        this.setState({recentGames});
    }

    componentDidMount() {
        this.getAllGames();
        this.getRecentlyPlayedGames();
    }

    render() {
        if(this.state.gameslist === null) {
            return (
                <LoadingScreen
                    text = 'Loading games'
                />
            )
        }
        return (
            <Fragment>
                <div className='gamesPage'>
                    <div className='nameBox'>
                        <p className='kidName'>
                            {this.props.match.params.childname}
                        </p>
                    </div>
                    <h3>Recently Played</h3> 
                    <div className='gameListing'>
                        {this.state.recentGames !== [] ?
                            <React.Fragment>
                            {this.state.recentGames.map((game) =>
                                <GameCard 
                                    game={game} 
                                    childname={this.props.match.params.childname} 
                                    key={game._id} 
                                />
                            )}
                            </React.Fragment>
                            : <React.Fragment>
                                <p> You have not played any games yet </p>
                            </React.Fragment>
                        }
                    </div>
                    <h3>All Games</h3>
                    <div className='gameListing'>
                        {this.state.gameslist.map((game) =>
                                <GameCard 
                                    game={game} 
                                    childname={this.props.match.params.childname} 
                                    key={game._id} 
                                />
                            )}
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default GamesPage
