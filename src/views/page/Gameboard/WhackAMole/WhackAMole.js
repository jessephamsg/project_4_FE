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
import StartButton from './StartButton';

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
            shake: 'translate(0, 0)',
            gameHasStarted: false,
            moleHasBeenWhacked: false,
            score: 0,
            lastMole: '',

        };

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

    // animate(el) {
    //     anime({
    //         targets: el,
    //         direction: 'alternate',
    //         loop: true,
    //         easing: 'easeInQuad',
    //         duration: 1600,
    //         scale: function (el, i, l) {
    //             return (l - i) + .08;
    //         },
    //     });
    // }

    timeOut(num) {
        if (this.state.gameHasStarted) { return };
        this.setState({
            buttonDisplay: 'none',
            display: 'block',
            gameOver: 'none',
            titleMargin: 0
        });
        this.shakeScreen();
        window.setTimeout(() => {
            this.startGame();
        }, num);
    }

    startGame() {
        if (this.state.gameHasStarted) { return; }

        this.setState({
            gameHasStarted: true,
            score: 0
        });

        let x = 0;
        const intervalID = setInterval(() => {
            this.displayMoles();
            if (++x === 16) {
                window.clearInterval(intervalID);
                this.clearMoles();
                this.setState({ gameHasStarted: false });
                window.setTimeout(() => {
                    this.setState({
                        display: 'none',
                        gameOver: 'block',
                        buttonMessage: 'Play again',
                        buttonDisplay: 'inline-block',
                        titleMargin: '15px'
                    });
                    // this.animate(this.refs.gameOver);
                }, 1500)
            }
        }, 1500);
    }

    lockOutClick() {
        window.setTimeout(() => {
            this.setState({ moleHasBeenWhacked: false })
        }, 1000)
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
        let activeMole = Math.ceil(Math.random() * 9);
        if (this.state.lastMole[0] === activeMole) {
            this.displayMoles();
            return;
        }
        this.clearMoles();
        this.setState({
            [activeMole]: 'translate(0, 15%)',
            lastMole: [activeMole]
        });
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

    createMoleHoles() {
        var holes = [];
        for (let i = 1; i <= 8; i++) {
            holes.push(<MoleHole key={i} context={this.state}
                onClick={this.addToScore.bind(this)} holeNumber={i} />);
        }
        console.log(holes);
        return (
            <div className="board">
                {holes}
            </div>
        );
    }

    shakeScreen() {
        let posOrNeg = '+';
        let i = 0;
        let shake = () => {
            if (i === 15) {
                this.setState({ shake: 'translate(0, 0)' });
                return;
            }
            window.setTimeout(() => {
                posOrNeg = posOrNeg === '-' ? '+' : '-';
                this.setState({ shake: `translate(${posOrNeg}${i}px, 0)` });
                shake();
            }, 80);
            i++
        };
        shake();
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
                                <StartButton context={this.state} onClick={this.timeOut.bind(this)} />
                                {this.createMoleHoles()}
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
