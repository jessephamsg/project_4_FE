//DEPENDENCIES
import React, {Component} from 'react';

//COMPONENT
import GameCardForParent from '../Card/ParentGameCard';
import LoadingScreen from '../../../page/LoadingPage';

//INTERACTION LOGICS
import GameInteractions from '../../../../interactions/ManageGames';

//STYLES
import './style_module.css';


class AllGames extends Component {

    constructor(props) {
        super (props) 
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
        if (this.state.gameList === null) {
            return (
                <LoadingScreen
                    text='Loading data'
                />
            )
        }
        return (
            <React.Fragment>
                {this.state.gameList.map((game) => {
                    return (
                        <GameCardForParent game={game} key={game._id} />
                        )
                    }
                )}
            </React.Fragment>
        )
    }

}

export default AllGames