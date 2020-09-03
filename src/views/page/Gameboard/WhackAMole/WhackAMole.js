//DEPENDENCIES
import React, { Component } from 'react';
import gameConfig from './config/gameSettings';
import { AuthService } from '../../../../interactions/AuthService';

//STATE CONTROLLERS
import gameInteractions from '../../../../interactions/GamePlay';

//COMPONENTS
import SelectLevelBoard from '../../../common/components/SlidingBoard/selectLevelBoard';
import WelcomeBoard from '../../../common/components/SlidingBoard/welcomeBoard';
import ScoreBoard from '../../../common/components/SlidingBoard/scoreBoard';

//CHILDREN
import MoleHole from './MoleHole';
import Timer from './Timer';

//STYLES
import './whackamole_style_module.css';

const gameName = 'whackamole';

export class WhackAMole extends Component {

    static contextType = AuthService

    constructor(props) {
        super(props)
        //general
        this.state = gameInteractions.InitialiseState.buildIntialStates();
        this.updateCurrentLevel = this.updateCurrentLevel.bind(this);
        this.updateGameStats = this.updateGameStats.bind(this);
        this.updateStartTime = this.updateStartTime.bind(this);
        this.updateOption = this.updateOption.bind(this);

        //only for this game
        this.state = {
            ...this.state,
            gameHasStarted: false,
            moleHasBeenWhacked: false,
            score: 0,
            lastMole: 0,
        };
        this.startGame = this.startGame.bind(this)
        this.reduceTime = this.reduceTime.bind(this)
    }

    async componentDidMount() {
        await this.setGameSettings();
        await this.setState(prevState => ({
            currentLevelSettings: {
                ...prevState.currentLevelSettings,
                lastMole: Math.ceil(Math.random() * this.state.currentLevelSettings.numOfMoles),
            }
        }))

        console.log("this.state.currentLevel: ", this.state.currentLevel)
    }

    async setGameSettings() {
        const { totalLevel, currentLevel, currentOption } = gameInteractions.InitialiseState.getLatestLocalGameState(gameConfig, gameName);
        const gameStats = {};
        for (const level of totalLevel) {
            gameStats[level] = gameInteractions.InitialiseState.buildInitialKeyGameStats();
        }
        this.setState({
            name: gameName,
            id: await gameInteractions.InitialiseState.getGameID(gameName),
            totalScore: 0, //needs to get from API using Kid's actual ID when kids repo is checked and set up
            currentLevel,
            currentLevelSettings: gameConfig.settings()[currentLevel],
            totalLevel,
            gameStats,
            currentOption
        })
    }

    async updateStartTime(startTime) {
        this.setState({ viewGame: true })
        if (gameInteractions.InitialiseState.isFirstTimePlayingGame(gameName) === false) {
            this.setState({
                startTime: this.state.startTime === undefined ? [startTime] : [...this.state.startTime, startTime],
            });
        } else {
            this.createKidStats();
        }
    }

    async createKidStats() {
        const { id, totalLevel } = this.state;
        const kidID = this.context.userId;
        await gameInteractions.InitialiseState.createKidsStats(id, gameName, kidID, totalLevel)
    }

    updateGameStats(level, isCorrect, submittedAt, totalScore) {
        let gameStats = { ...this.state.gameStats }
        const overallTotal = this.state.totalScore + totalScore;
        const updatedGameStats = gameInteractions.UpdateState.updateDefaultGameStatsObj(gameStats, level, submittedAt, isCorrect, totalScore);
        this.setState({
            gameStats: updatedGameStats,
            totalScore: overallTotal
        });
        this.updateKidStats(level, this.state.gameStats);
    }

    async updateKidStats(level, levelStatsState) {
        const gameID = this.state.id;
        const kidID = this.context.userId;//this is currently parentsID need to edit
        await gameInteractions.UpdateState.updateKidsStats(gameID, level, levelStatsState, kidID);
    }

    updateOption(option, level) {
        this.setState({
            currentOption: option,
        });
        gameInteractions.UpdateState.updateLocalViewState(gameName, level, option)
    }

    updateCurrentLevel(level) {
        this.setState({
            currentLevel: level,
            currentLevelSettings: { ...gameConfig.settings()[`${level}`] }
        });
        gameInteractions.UpdateState.updateLocalViewState(gameName, level, 1)
        console.log("level changed to ", this.state.currentLevel, ": ", this.state.currentLevelSettings)
    }

    populateMoles() {
        var arrMoles = [];
        const numOfMoles = this.state.currentLevelSettings.numOfMoles;
        for (let i = 1; i <= numOfMoles; i++) {
            arrMoles.push(<MoleHole key={i} moleStyle={this.state.currentLevelSettings}
                onClick={this.addToScore.bind(this)} holeNumber={i} />);
        }
        return (
            <div className="board">
                {arrMoles}
            </div>
        );
    }

    async reduceTime() {
        await this.setState(prevState => ({
            currentLevelSettings: {
                ...prevState.currentLevelSettings,
                remainingTime: this.state.currentLevelSettings.remainingTime - 1,
            }
        }))
    }

    async stopTimer() {
        await this.setState({
            gameHasStarted: false,
        })
        await this.setState(prevState => ({
            currentLevelSettings: {
                ...prevState.currentLevelSettings,
                remainingTime: gameConfig.settings()[this.state.currentLevel].remainingTime,
            }
        }))
        console.log("this.state.gameHasStarted: ", this.state.gameHasStarted)
        console.log("this.state.remainingTime@stopTimer(): ", this.state.currentLevelSettings.remainingTime)
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
        const interval = this.state.currentLevelSettings.molePopInterval;
        const numOfMoles = this.state.currentLevelSettings.numOfMoles;
        let activeMole = Math.ceil(Math.random() * numOfMoles);
        console.log=this.state.lastMole[0];
        const creatingMoles = setInterval(() => {
            while (activeMole === this.state.lastMole[0]) {
                activeMole = Math.ceil(Math.random() * numOfMoles);
                this.clearMoles();
            }
            this.setState(prevState => ({
                currentLevelSettings: {
                    ...prevState.currentLevelSettings,
                    [activeMole]: 'translate(0, 15%)',
                    lastMole: [activeMole],
                }
            }))
            if (this.state.currentLevelSettings.remainingTime <= 0) {
                clearInterval(creatingMoles);
                this.stopTimer();
                this.clearMoles();
                console.log("times up")
            }
        }
            , interval);
    }

    clearMoles() {
        for (let value in this.state.currentLevelSettings) {
            if (!isNaN(value)) {
                this.setState(prevState => ({
                    currentLevelSettings: {
                        ...prevState.currentLevelSettings,
                        [value]: 'translate(0, 110%)'
                    }
                }));
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
                    <div id='gameContainerWhackAMole'>
                        <div className='gameContentLeftWhackAMole'>
                            <h1>Level: {this.state.currentLevel}</h1>
                            <h1>Score: {this.state.score}</h1>
                            <Timer key={this.state.gameHasStarted} reduceTime={this.reduceTime} remainingTime={this.state.currentLevelSettings.remainingTime} gameHasStarted={this.state.gameHasStarted} />
                            <button onClick={this.startGame}>Start</button>
                            <div className='gameStatsBoardsWhackAMole'>
                                <SelectLevelBoard
                                    totalLevel={this.state.totalLevel}
                                    updateCurrentLevel={this.updateCurrentLevel}
                                />
                                <ScoreBoard
                                    totalScore={this.state.totalScore}
                                />
                            </div>
                        </div>

                        <div className='gameContentWrapperWhackAMole'>
                            <div className='gameMainContentWhackAMole'>
                                {this.populateMoles()}
                            </div>
                        </div>
                    </div>
                    :
                    <WelcomeBoard
                        updateStartTime={this.updateStartTime}
                        backgroundImg={'https://i.ibb.co/fDXXRvL/whack2.png'}
                        gameTitle={'Whack A Sloth'}
                    />
                }
            </React.Fragment>
        )
    }
}

export default WhackAMole
