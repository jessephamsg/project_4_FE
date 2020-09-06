//DEPENDENCIES
import React, {Component} from 'react';
import gameConfig from './config/gameSettings';
import {AuthService} from '../../../../interactions/AuthService';

//INTERACTION LOGICS
import gameInteractions from '../../../../interactions/GamePlay'

//COMPONENTS
import SelectLevelBoard from '../../../common/components/SlidingBoard/selectLevelBoard';
import WelcomeBoard from '../../../common/components/SlidingBoard/welcomeBoard';
import ScoreBoard from '../../../common/components/SlidingBoard/scoreBoard';

//CHILDREN
import DragglebleList from './draggableList';
import ListOptions from './listOptions';

//STYLES
import layout from '../../../common/layouts/gameContainer.styles.css';
import './style_module.css';



class PuzzleGame extends Component {

    static contextType = AuthService

    constructor (props) {
        super (props) 
        this.state = gameInteractions.InitialiseState.buildIntialStates();
        this.updateCurrentLevel = this.updateCurrentLevel.bind(this);
        this.updateGameStats = this.updateGameStats.bind(this);
        this.updateStartTime = this.updateStartTime.bind(this);
        this.updateOption = this.updateOption.bind(this);
    }

    componentDidMount () {
        this.setGameSettings();
    }

    async setGameSettings () {
        const kidName = this.props.kidName;
        const {totalLevel, currentLevel, currentOption} = gameInteractions.InitialiseState.getLatestLocalGameState(gameConfig, this.props.gameName, kidName);
        const gameStats = {};
        for(const level of totalLevel) {
            gameStats[level] = gameInteractions.InitialiseState.buildInitialKeyGameStats();
        }
        const gameID = await gameInteractions.InitialiseState.getGameID(this.props.gameName);
        const totalScore = await gameInteractions.InitialiseState.getTotalScore(this.props.kidName, this.context.userId, gameID); 
        this.setState({
            id: gameID,
            totalScore, 
            currentLevel,
            currentLevelSettings: gameConfig.settings()[currentLevel],
            totalLevel,
            gameStats,
            currentOption
        })
    }

    async updateStartTime (startTime) {
        this.setState({ viewGame: true })
        if (gameInteractions.InitialiseState.isFirstTimePlayingGame(this.props.gameName, this.props.kidName) === false) {
            this.setState({
                startTime: this.state.startTime === undefined ? [startTime] : [...this.state.startTime, startTime],
            });
        } else {
            this.createKidStats();
        }
    }

    async createKidStats () {
        const {id, totalLevel} = this.state;
        const parentID = this.context.userId;
        const kidName = this.props.kidName;
        await gameInteractions.InitialiseState.createKidsStats(id, this.props.gameName, parentID, kidName, totalLevel)
    }

    updateGameStats (level, isCorrect, submittedAt, totalScore) {
        let gameStats = {...this.state.gameStats}
        const overallTotal = this.state.totalScore + totalScore;
        const updatedGameStats = gameInteractions.UpdateState.updateDefaultGameStatsObj(gameStats, level, submittedAt, isCorrect, totalScore);
        this.setState({
            gameStats: updatedGameStats,
            totalScore: overallTotal
        });
        this.updateKidStats(level, this.state.gameStats);
    }

    async updateKidStats (level, levelStatsState) {
        const gameID = this.state.id;
        const parentID = this.context.userId;//this is currently parentsID need to edit
        const kidName = this.props.kidName;
        await gameInteractions.UpdateState.updateKidsStats(gameID, level, levelStatsState, parentID, kidName);
    }

    updateOption (option,level) {
        this.setState({
            currentOption: option,
        });
        gameInteractions.UpdateState.updateLocalViewState(this.props.kidName, this.props.gameName, level, option)
    }

    updateCurrentLevel (level) {
        this.setState({
            currentLevel: level,
            currentLevelSettings: {...gameConfig.settings()[`${level}`]}
        });
        gameInteractions.UpdateState.updateLocalViewState(this.props.kidName, this.props.gameName, level, 1)
    }
 
    render () {
        if(this.state.currentLevel == null) {
            return (
                <div>insert loading screen here</div>
            )
        }
        return (
            <React.Fragment>
                {this.state.viewGame === true ?
                    <div className='gameContainerWrapper'> 
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