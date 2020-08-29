//DEPENDENCIES
import React, { Component } from 'react';
import gameConfig from './config/gameSettings';
import gameUtils from '../utils';

//GAME STANDARD MODELS
import GameStatsModel from '../../../../models/GameStats';
import LevelStatsModel from '../../../../models/LevelStats';

//COMPONENTS
import SelectLevelBoard from '../../../common/components/SlidingBoard/selectLevelBoard';
import WelcomeBoard from '../../../common/components/SlidingBoard/welcomeBoard';
import ScoreBoard from '../../../common/components/SlidingBoard/scoreBoard';

//STYLES
import './style_module.css';

export class WhackAMole extends Component {
    constructor(props) {
        super(props)
        this.state = GameStatsModel.gameInitialState();
        // this.state
        //     totalLevel: null,
        //     totalScore: null,
        //     startTime: [],
        //     pauseTime: [],
        //     currentLevel: null,
        //     currentOption: null,
        //     currentLevelSettings: {},
        //     gameStats: {},
        //     viewGame: false,
        //     viewBoard: false,
        this.updateCurrentLevel = this.updateCurrentLevel.bind(this);
        this.updateGameStats = this.updateGameStats.bind(this);
        this.updateStartTime = this.updateStartTime.bind(this);
        this.updateOption = this.updateOption.bind(this);
    }

    componentDidMount() {
        const totalLevel = Object.keys(gameConfig.settings());
        const currentLevelSettings = gameConfig.settings()[0] //need to update totalScore from API too
        const gameStats = {};
        for (const level of totalLevel) {
            gameStats[level] = LevelStatsModel.levelInitialStats();
        }
        this.setState({
            totalScore: 0,
            currentLevel: 0,
            currentLevelSettings,
            totalLevel,
            gameStats,
            currentOption: 1
        })
    }

    updateCurrentLevel(level) {
        const currentLevelSettings = gameConfig.settings()[`${level}`]
        this.setState({
            currentLevel: level,
            currentLevelSettings
        });
    }

    updateGameStats(level, isCorrect, submittedAt, totalScore) {
        let gameStats = { ...this.state.gameStats }
        const overallTotal = this.state.totalScore + totalScore;
        const updatedGameStats = gameUtils.updateDefaultGameStatsObj(gameStats, level, submittedAt, isCorrect, totalScore)
        this.setState({
            gameStats: updatedGameStats,
            totalScore: overallTotal
        });
    }

    updateStartTime(startTime) {
        this.setState({
            startTime: this.state.startTime === undefined ? [startTime] : [...this.state.startTime, startTime],
            viewGame: true
        })
    }

    updateOption(option, level) {
        this.setState({
            currentOption: option
        })
    }

    render() {
        if (this.state.currentLevel == null) {
            return (
                <div>insert loading screen here</div>
            )
        }
        return (
            <React.Fragment>
                {this.state.viewGame === true ?
                    <div id='gameContainer'>
                        <div className='gameContentLeft'>
                            <h1>Level: {this.state.currentLevel}</h1>
                            <h1>Score: {this.state.currentLevel}</h1>
                            <h1>Timer: {this.state.currentLevel}</h1>
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

                        <div className='gameContentWrapper'>
                            <div className='gameMainContent'>
                                <h2>Whack a mole game here</h2>
                            </div>
                        </div>
                    </div>
                    :
                    <WelcomeBoard
                        updateStartTime={this.updateStartTime}
                        backgroundImg={'https://i.ibb.co/fDXXRvL/whack2.png'}
                        gameTitle={'Whack A Raccoon'}
                    />
                }
            </React.Fragment>
        )
    }
}

export default WhackAMole
