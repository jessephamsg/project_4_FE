//DEPENDENCIES
import React, {Component} from 'react';
import gameConfig from './config/gameSettings';
import gameUtils from '../utils';
import {AuthService} from '../../../../services/AuthService';

//API CALLS
import axios from 'axios';
import apis from '../../../../api';

//GAME STANDARD MODELS
import GameStatsModel from '../../../../models/GameStats';
import LevelStatsModel from '../../../../models/LevelStats';

//LOCAL STORAGE
import LocalGameState from '../../../../storage/gameLocalState';

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
        this.state = GameStatsModel.gameInitialState()
        this.updateCurrentLevel = this.updateCurrentLevel.bind(this);
        this.updateGameStats = this.updateGameStats.bind(this);
        this.updateStartTime = this.updateStartTime.bind(this);
        this.updateOption = this.updateOption.bind(this);
    }

    componentDidMount () {
        this.getGameID();
        this.setGameSettings();
    }

    updateStartTime (startTime) {
        const gameName = this.state.name;
        const result = LocalGameState.getGameLocal();
        if (result !== null) {
            if (result[`${gameName}`] !== null) {
                this.setState({
                    startTime: this.state.startTime === undefined ? [startTime] : [...this.state.startTime, startTime],
                    viewGame: true
                });
            } else {
                LocalGameState.createGameLocal(gameName);
                this.createKidStats();
                this.setState({viewGame: true});
            }
        } else {
                LocalGameState.createGameLocal(gameName);
                this.createKidStats();
                this.setState({viewGame: true});
        }
    }

    async getGameID () {
        const gameObject = await apis.getGameID(gameName)
        const gameID = gameObject.data.data[0]._id;
        this.setState({
            name: gameName,
            id: gameID
        });
    }

    setGameSettings () {
        const totalLevel = Object.keys(gameConfig.settings());
        const currentLevel = LocalGameState.getGameLocal()[gameName].currentLevel || 0;
        const currentOption = LocalGameState.getGameLocal()[gameName].currentOption || 1;
        const currentLevelSettings = gameConfig.settings()[currentLevel] //need to update totalScore from API too
        const gameStats = {};
        for(const level of totalLevel) {
            gameStats[level] = LevelStatsModel.levelInitialStats();
        }
        this.setState({
            totalScore: 0,
            currentLevel: currentLevel,
            currentLevelSettings,
            totalLevel,
            gameStats,
            currentOption: currentOption
        })
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
        const {startTime, endTime, score, attemptsBeforeSuccess} = gameUtils.analyseLevelStats(levelStatsState[`${level}`]);
        const kidStatsPayload = GameStatsModel.gameStatsPayload(gameID, level, startTime, endTime, score, attemptsBeforeSuccess, null);
        const result = await apis.updateKidStats(kidID, gameID, level, kidStatsPayload);
    }

    async createKidStats () {
        const gameID = this.state.id;
        const kidID = this.context.userId;
        const totalLevels = this.state.totalLevel;
        const kidStatsPayloadArr = [];
        for (const level of totalLevels) {
            const levelPayload = GameStatsModel.gameStatsPayload(gameID, level, '', '', 0, 0, null);
            kidStatsPayloadArr.push(levelPayload)
        }
        const result = await apis.createKidStats(kidID, gameID, kidStatsPayloadArr);
    }

    updateOption (option,level) {
        this.setState({
            currentOption: option,
        });
        LocalGameState.updateGameLocal(gameName, {
            currentLevel: level, 
            currentOption: option
        })
    }

    updateCurrentLevel (level) {
        const currentLevelSettings = {...gameConfig.settings()[`${level}`]}
        this.setState({
            currentLevel: level,
            currentLevelSettings
        });
        LocalGameState.updateGameLocal(gameName, {
            currentLevel: level, 
            currentOption: 1
        })
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