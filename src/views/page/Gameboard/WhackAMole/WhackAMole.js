//DEPENDENCIES
import React, { Component } from 'react';
import gameConfig from './config/gameSettings';
import { AuthService } from '../../../../interactions/AuthService';

//INTERACTION LOGICS
import gameInteractions from '../../../../interactions/GamePlay';
import gameUtils from '../../../../interactions/GamePlay/utils/utils';

//COMPONENTS
import SelectLevelBoard from '../../../common/components/SlidingBoard/selectLevelBoard';
import WelcomeBoard from '../../../common/components/SlidingBoard/welcomeBoard';
import ScoreBoard from '../../../common/components/SlidingBoard/scoreBoard';
import SubmitButton from '../../../common/components/SubmitButton';
import LoadingScreen from '../../LoadingPage';

//CHILDREN
import MoleHole from './MoleHole';
import Timer from './Timer';

//STYLES
import layout from '../../../common/layouts/gameContainer.styles.css';
import './style_module.css';


export class WhackAMole extends Component {

    static contextType = AuthService

    constructor(props) {
        super(props)
        this.state = gameInteractions.InitialiseState.buildIntialStates();
        this.updateCurrentLevel = this.updateCurrentLevel.bind(this);
        this.updateGameStats = this.updateGameStats.bind(this);
        this.updateStartTime = this.updateStartTime.bind(this);
        this.updateOption = this.updateOption.bind(this);
        this.startGame = this.startGame.bind(this)
        this.addToScore = this.addToScore.bind(this);
        this.reduceTime = this.reduceTime.bind(this)
    }

    async componentDidMount() {
        await this.setGameSettings();
        const currentLevelSettings = {...this.state.currentLevelSettings};
        let currentLevelLastMole = currentLevelSettings.lastMole;
        currentLevelLastMole =  Math.ceil(Math.random() * currentLevelSettings.numOfMoles);
        this.setState({currentLevelSettings})
    }

    async setGameSettings() {
        const {totalLevel, currentLevel, currentOption} = gameInteractions.InitialiseState.getLatestLocalGameState(gameConfig, this.props.gameName, this.props.kidName);        
        const gameStats = {};
        for (const level of totalLevel) {
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

    async updateStartTime(startTime) {
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

    updateGameStats() {
        const level = this.state.currentLevel;
        let gameStats = {...this.state.gameStats}
        let currentOrder = [this.state.currentLevelSettings.score]
        const {isCorrect, submitTime, score} = gameUtils.getSubmissionStats(
            currentOrder,
            this.state.currentLevelSettings.winningOrder
        )
        const updatedGameStats = gameInteractions.UpdateState.updateDefaultGameStatsObj(gameStats, level, submitTime, isCorrect, score);
        const overallTotal = this.state.totalScore + score;
        this.setState({
            gameStats: updatedGameStats,
            totalScore: overallTotal
        });
        this.updateKidStats(level, this.state.gameStats);
    }

    async updateKidStats (level, levelStatsState) {
        const gameID = this.state.id;
        const parentID = this.context.userId;
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

    startGame() {
        let currentLevelSettings = {...this.state.currentLevelSettings};
        if (currentLevelSettings.gameHasStarted) return
        currentLevelSettings.gameHasStarted = true;
        currentLevelSettings.score = 0;
        this.setState({ currentLevelSettings }, ()=> {
            this.displayMoles();
        });
    }

    displayMoles() {
        let {molePopInterval, numOfMoles} = this.state.currentLevelSettings
        const creatingMoles = setInterval(() => {
            this.selectActiveMoles(numOfMoles);
            if (this.state.currentLevelSettings.remainingTime <= 0) {
                clearInterval(creatingMoles);
                this.stopTimer();
                this.clearMoles();
            }
        }, molePopInterval);
    }

    selectActiveMoles (numOfMoles) {
        let activeMole = this.randomiseActiveMoles(numOfMoles);
        while (activeMole === this.state.currentLevelSettings.lastMole) {
            activeMole = this.randomiseActiveMoles(numOfMoles);
            this.clearMoles();
        }
        this.setState(prevState => ({
            currentLevelSettings: {
                ...prevState.currentLevelSettings,
                [activeMole]: 'translate(0, 15%)',
                lastMole: activeMole,
            }
        }))
    }

    randomiseActiveMoles (numOfMoles) {
        return Math.ceil(Math.random() * numOfMoles);
    }
  
    reduceTime() {
        const currentLevelSettings = {...this.state.currentLevelSettings};
        currentLevelSettings.remainingTime = currentLevelSettings.remainingTime -1;
        this.setState({currentLevelSettings}, () => {
            return this.state.currentLevelSettings.remainingTime
        })
    }

    stopTimer() {
        const currentLevelSettings = {...this.state.currentLevelSettings};
        currentLevelSettings.gameHasStarted = false;
        this.setState({currentLevelSettings}, () => {
            currentLevelSettings.remainingTime = gameConfig.settings()[this.state.currentLevel].remainingTime
            this.setState({currentLevelSettings}) 
        })
        return
    }

    addToScore (e) {
        let target = e.target;
        this.animateWhacked(target, true)
        this.lockOutClick();
        this.isSuccess();
        window.setTimeout(() => {
            this.animateWhacked(target, false)
        }, 500)
    }

    animateWhacked (target, isWhacked) {
        if (isWhacked) {
            target.parentNode.classList.add('game__cross');
            target.classList.add('no-background');
        } else {
            target.parentNode.classList.remove('game__cross');
            target.classList.remove('no-background');
        }
    }

    isSuccess () {
        this.setState(prevState => ({
            currentLevelSettings: {
                ...prevState.currentLevelSettings,
                moleHasBeenWhacked: true,
                score: parseInt(this.state.currentLevelSettings.score, 10) + 1,
                [this.state.currentLevelSettings.lastMole]: 'translate(0, 110%)',
            }
        }))
    }

    lockOutClick() {
        window.setTimeout(() => {
            this.setState(prevState => ({
                currentLevelSettings: {
                    ...prevState.currentLevelSettings,
                    moleHasBeenWhacked: false,
                }
            }))
        }, 1000)
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
        console.log(this.state.currentLevelSettings)
        if (this.state.currentLevel == null) {
            return (
                <LoadingScreen
                    text = 'Loading Game...'
                />
            )
        }
        return (
            <React.Fragment>
                {this.state.viewGame === true ?
                    <div className='gameContainerWrapper'>
                        <div id='gameContainerWhackAMole'>
                            <div className='gameContentLeftWhackAMole'>
                                <h1>Level: {this.state.currentLevel}</h1>
                                <h1>Score: {this.state.currentLevelSettings.score}</h1>
                                <Timer 
                                    key={this.state.currentLevelSettings.gameHasStarted} 
                                    reduceTime={this.reduceTime} 
                                    remainingTime={this.state.currentLevelSettings.remainingTime} 
                                    gameHasStarted={this.state.currentLevelSettings.gameHasStarted} />
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
                                    {[...Array(this.state.currentLevelSettings.numOfMoles)].map((item,i) => {
                                        return (
                                            <div className="board">
                                                <MoleHole 
                                                    key={i} 
                                                    moleStyle={this.state.currentLevelSettings[i]}
                                                    onClick={this.addToScore} 
                                                />
                                            </div>
                                        )
                                    })}
                                </div>
                                <SubmitButton 
                                    order={this.state.currentLevelSettings.score} 
                                    winningOrder={this.state.currentLevelSettings.winningOrder} 
                                    updateStats={this.updateGameStats}
                                    top = '0px'
                                    left = '11px'
                                    topEmoji = '-60px'
                                    leftEmoji = '80px'
                                />
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
