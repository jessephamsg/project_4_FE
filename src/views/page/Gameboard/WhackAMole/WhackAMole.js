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

//CHILDREM
import MoleHole from './MoleHole';
import Timer from './Timer';

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
        this.state = {
            ...this.state,
            1: 'translate(0, 110%)',
            2: 'translate(0, 110%)',
            3: 'translate(0, 110%)',
            4: 'translate(0, 110%)',
            5: 'translate(0, 110%)',
            6: 'translate(0, 110%)',
            7: 'translate(0, 110%)',
            8: 'translate(0, 110%)',
            9: 'translate(0, 110%)',
            10: 'translate(0, 110%)',
            11: 'translate(0, 110%)',
            12: 'translate(0, 110%)',
            13: 'translate(0, 110%)',
            14: 'translate(0, 110%)',
            15: 'translate(0, 110%)',
            16: 'translate(0, 110%)',
            gameHasStarted: false,
            moleHasBeenWhacked: false,
            score: 0,
            numOfMoles: 8,
            lastMole: Math.ceil(Math.random() * 9),
            remainingTime: 5,
            molePopDuration: 1500,
            molePopInterval: 1500,
        };

        this.updateCurrentLevel = this.updateCurrentLevel.bind(this);
        this.updateGameStats = this.updateGameStats.bind(this);
        this.updateStartTime = this.updateStartTime.bind(this);
        this.updateOption = this.updateOption.bind(this);
        this.startGame = this.startGame.bind(this)
        this.reduceTime = this.reduceTime.bind(this)
    }

    populateMoles() {
        var arrMoles = [];
        for (let i = 1; i <= 9; i++) {
            arrMoles.push(<MoleHole key={i} moleStyle={this.state}
                onClick={this.addToScore.bind(this)} holeNumber={i} />);
        }
        return (
            <div className="board">
                {arrMoles}
            </div>
        );
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

    async reduceTime() {
        await this.setState({
            remainingTime: this.state.remainingTime - 1
        })
    }

    async stopTimer() {
        await this.setState({
            remainingTime: 20,
            gameHasStarted: false,
        })
        console.log("this.state.gameHasStarted: ", this.state.gameHasStarted)
    }

    lockOutClick() {
        window.setTimeout(() => {
            this.setState({ moleHasBeenWhacked: false })
        }, 1000)
    }

    async startGame() {
        if (this.state.gameHasStarted) { return; }
        console.log("this.state.gameHasStarted: ", this.state.gameHasStarted);
        await this.setState({
            gameHasStarted: true,
            score: 0
        });
        console.log("this.state.gameHasStarted: ", this.state.gameHasStarted);
        this.displayMoles();
    }

    addToScore(e) {
        if (this.state.moleHasBeenWhacked) { return; }
        let target = e.target;
        target.parentNode.classList.add('game__cross');
        target.classList.add('no-background');
        this.lockOutClick();
        this.setState({
            background: '75px',
            moleHasBeenWhacked: true,
            score: [parseInt(this.state.score, 10) + 1]
        });
        window.setTimeout(function () {
            target.parentNode.classList.remove('game__cross');
            target.classList.remove('no-background');
        }, 500)
    }

    displayMoles() {
        // const duration = this.state.molePopDuration;
        const interval = this.state.molePopInterval;
        let activeMole = Math.ceil(Math.random() * 9);
        const creatingMoles = setInterval(() => {
            while (activeMole === this.state.lastMole[0]) {
                activeMole = Math.ceil(Math.random() * 9);
                this.clearMoles();
            }
            console.log("activeMole: ", activeMole);
            console.log("this.state.lastMole: ", this.state.lastMole);
            this.setState({
                [activeMole]: 'translate(0, 15%)',
                lastMole: [activeMole]
            });
            console.log("this.state.remainingTime: ", this.state.remainingTime)
            if (this.state.remainingTime <= 0) {
                clearInterval(creatingMoles);
                this.stopTimer();
                this.clearMoles();
                console.log("times up")
            }
        }
            , interval);
    }

    clearMoles() {
        for (let value in this.state) {
            if (!isNaN(value)) {
                this.setState({
                    [value]: 'translate(0, 110%)'
                });
            }
        }
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
                            <h1>Score: {this.state.score}</h1>
                            <Timer key={this.state.gameHasStarted} reduceTime={this.reduceTime} remainingTime={this.state.remainingTime} gameHasStarted={this.state.gameHasStarted} />
                            <button onClick={this.startGame}>Start</button>
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
                                {this.populateMoles()}
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
