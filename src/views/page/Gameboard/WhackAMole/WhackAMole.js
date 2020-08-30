//DEPENDENCIES
import React, { Component } from 'react';
import gameConfig from './config/gameSettings';
import { AuthService } from '../../../../services/AuthService';

//STATE CONTROLLERS
import stateControllers from '../stateControllers'

//COMPONENTS
import SelectLevelBoard from '../../../common/components/SlidingBoard/selectLevelBoard';
import WelcomeBoard from '../../../common/components/SlidingBoard/welcomeBoard';
import ScoreBoard from '../../../common/components/SlidingBoard/scoreBoard';

//CHILDREN
import MoleHole from './MoleHole';
import Timer from './Timer';

//STYLES
import './style_module.css';

const gameName = 'whackamole';

export class WhackAMole extends Component {

    static contextType = AuthService

    constructor(props) {
        super(props)
        //general
        this.state = stateControllers.InitialiseState.buildIntialStates();
        this.updateCurrentLevel = this.updateCurrentLevel.bind(this);
        this.updateGameStats = this.updateGameStats.bind(this);
        this.updateStartTime = this.updateStartTime.bind(this);
        this.updateOption = this.updateOption.bind(this);
        
        //only for this game
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
        this.startGame = this.startGame.bind(this)
        this.reduceTime = this.reduceTime.bind(this)
    }

    componentDidMount () {
        this.setGameSettings();
    }

    async setGameSettings () {
        const {totalLevel, currentLevel, currentOption} = stateControllers.InitialiseState.getLatestLocalGameState(gameConfig, gameName);
        const gameStats = {};
        for(const level of totalLevel) {
            gameStats[level] = stateControllers.InitialiseState.buildInitialKeyGameStats();
        }
        this.setState({
            name: gameName,
            id: await stateControllers.InitialiseState.getGameID(gameName),
            totalScore: 0, //needs to get from API using Kid's actual ID when kids repo is checked and set up
            currentLevel,
            currentLevelSettings: gameConfig.settings()[currentLevel],
            totalLevel,
            gameStats,
            currentOption
        })
    }

    async updateStartTime (startTime) {
        this.setState({ viewGame: true })
        if (stateControllers.InitialiseState.isFirstTimePlayingGame(gameName) === false) {
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
        await stateControllers.InitialiseState.createKidsStats(id, gameName, kidID, totalLevel)
    }

    updateGameStats (level, isCorrect, submittedAt, totalScore) {
        let gameStats = {...this.state.gameStats}
        const overallTotal = this.state.totalScore + totalScore;
        const updatedGameStats = stateControllers.UpdateState.updateDefaultGameStatsObj(gameStats, level, submittedAt, isCorrect, totalScore);
        this.setState({
            gameStats: updatedGameStats,
            totalScore: overallTotal
        });
        this.updateKidStats(level, this.state.gameStats);
    }

    async updateKidStats (level, levelStatsState) {
        const gameID = this.state.id;
        const kidID = this.context.userId;//this is currently parentsID need to edit
        await stateControllers.UpdateState.updateKidsStats(gameID, level, levelStatsState, kidID);
    }

    updateOption (option,level) {
        this.setState({
            currentOption: option,
        });
        stateControllers.UpdateState.updateLocalViewState(gameName, level, option)
    }

    updateCurrentLevel (level) {
        this.setState({
            currentLevel: level,
            currentLevelSettings: {...gameConfig.settings()[`${level}`]}
        });
        stateControllers.UpdateState.updateLocalViewState(gameName, level, 1)
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
