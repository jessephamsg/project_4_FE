//DEPENDENCIES
import React, {Component} from 'react';
import gameConfig from './config/gameSettings';
import gameUtils from '../utils/stats/utils';
import {AuthService} from '../../../../services/AuthService';

//STATE CONTROLLERS
import stateUtils from '../utils/states/'

//COMPONENTS
import SelectLevelBoard from '../../../common/components/SlidingBoard/selectLevelBoard';
import WelcomeBoard from '../../../common/components/SlidingBoard/welcomeBoard';
import ScoreBoard from '../../../common/components/SlidingBoard/scoreBoard';
import DragglebleList from './draggableList';
import ListOptions from './listOptions';

//STYLES
//import layout from '../../../common/layouts/gameContainer.styles.css';
import './style_module.css';


const gameName = 'puzzle';

class PuzzleGame extends Component {

    static contextType = AuthService

    constructor (props) {
        super (props) 
        this.state = stateUtils.InitialiseState.buildIntialStates();
        this.updateCurrentLevel = this.updateCurrentLevel.bind(this);
        this.updateGameStats = this.updateGameStats.bind(this);
        this.updateStartTime = this.updateStartTime.bind(this);
        this.updateOption = this.updateOption.bind(this);
    }

    componentDidMount () {
        this.setGameSettings();
    }

    async setGameSettings () {
        const {totalLevel, currentLevel, currentOption, currentLevelSettings} = stateUtils.InitialiseState.getLatestLocalGameState(gameConfig, gameName);
        const gameStats = {};
        for(const level of totalLevel) {
            gameStats[level] = stateUtils.InitialiseState.buildInitialKeyGameStats();
        }
        this.setState({
            name: gameName,
            id: await stateUtils.InitialiseState.getGameID(gameName),
            totalScore: 0, //needs to get from API using Kid's actual ID when kids repo is checked and set up
            currentLevel: currentLevel,
            currentLevelSettings,
            totalLevel,
            gameStats,
            currentOption: currentOption
        })
    }

    async updateStartTime (startTime) {
        this.setState({ viewGame: true })
        if (stateUtils.InitialiseState.isFirstTimePlayingGame(gameName) === false) {
            this.setState({
                startTime: this.state.startTime === undefined ? [startTime] : [...this.state.startTime, startTime],
            });
        } else {
            this.createKidStats();
        }
    }

    async createKidStats () {
        const {id, totalLevel} = this.state;
        const kidID = this.context.userId;
        await stateUtils.InitialiseState.createKidsStats(id, gameName, kidID, totalLevel)
    }

    updateGameStats (level, isCorrect, submittedAt, totalScore) {
        let gameStats = {...this.state.gameStats}
        const overallTotal = this.state.totalScore + totalScore;
        const updatedGameStats = gameUtils.updateDefaultGameStatsObj(gameStats, level, submittedAt, isCorrect, totalScore);
        this.setState({
            gameStats: updatedGameStats,
            totalScore: overallTotal
        });
        this.updateKidStats(level, this.state.gameStats);
    }

    async updateKidStats (level, levelStatsState) {
        const gameID = this.state.id;
        const kidID = this.context.userId;//this is currently parentsID need to edit
        await stateUtils.UpdateState.updateKidsStats(gameID, level, levelStatsState, kidID);
    }

    updateOption (option,level) {
        this.setState({
            currentOption: option,
        });
        stateUtils.UpdateState.updateLocalViewState(gameName, level, option)
    }

    updateCurrentLevel (level) {
        this.setState({
            currentLevel: level,
            currentLevelSettings: {...gameConfig.settings()[`${level}`]}
        });
        stateUtils.UpdateState.updateLocalViewState(gameName, level, 1)
    }
 
    render () {
        console.log(this.state)
        if(this.state.currentLevel == null) {
            return (
                <div>insert loading screen here</div>
            )
        }
        return (
            <React.Fragment>
                {this.state.viewGame === true ? 
                    <div id='gameContainerPuzzle'>
                        <h1>Level: {this.state.currentLevel}</h1>
                        <div className='gameContentWrapper'>
                            <div className='gameMainContent'>
                                <ListOptions
                                    options={this.state.currentLevelSettings.options}
                                    level={this.state.currentLevel}
                                    updateOption={this.updateOption}
                                />
                                <DragglebleList 
                                    items={[...Array(this.state.currentLevelSettings.items).keys()]} 
                                    winningOrder={this.state.currentLevelSettings.winningOrder} 
                                    img={this.state.currentLevelSettings.assets}
                                    currentOption={this.state.currentOption}
                                    level={this.state.currentLevel}
                                    updateGameStats={this.updateGameStats}
                                />
                            </div>
                            <div className='gameStatsBoards'>
                                <SelectLevelBoard 
                                    totalLevel={this.state.totalLevel} 
                                    updateCurrentLevel={this.updateCurrentLevel}
                                />
                                <ScoreBoard
                                    totalScore={this.state.totalScore}
                                />
                            </div>
                        </div>
                    </div>
                    : 
                    <WelcomeBoard 
                        updateStartTime = {this.updateStartTime}
                        backgroundImg={'https://i.imgur.com/EaRny9V.png'}
                        gameTitle={'Puzzle Game'}
                    />
                } 
            </React.Fragment>
        )
    }
}

export default PuzzleGame