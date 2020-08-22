//DEPENDENCIES
import React, {Component} from 'react';
import gameConfig from './config/gameSettings';

//COMPONENTS
import SelectLevelBoard from '../../../common/components/SlidingBoard/selectLevelBoard';
import WelcomeBoard from '../../../common/components/SlidingBoard/welcomeBoard';
import ScoreBoard from '../../../common/components/SlidingBoard/scoreBoard';
import DragglebleList from './draggableList';
import ListOptions from './listOptions';

//STYLES
import './style_module.css';


class PuzzleGame extends Component {

    constructor (props) {
        super (props) 
        this.state = {
            totalLevel: 3,
            currentLevel: 0,
            totalScore: 0,
            currentLevelSettings: {
                items: 4,
                winningOrder: [0, 3, 2, 1],
                assets: ['https://imgur.com/UEO12ij', 'https://imgur.com/CdSGRWS', 'https://imgur.com/x6BBBlX', 'https://imgur.com/LV2iqWS'],
            },
            startTime: [],
            pauseTime: [],
            viewGame: false,
            gameStats: {},
            viewBoard: false,
        }
        this.updateCurrentLevel = this.updateCurrentLevel.bind(this);
        this.updateGameStats = this.updateGameStats.bind(this);
        this.updateStartTime = this.updateStartTime.bind(this);
    }

    componentDidMount () {
        const totalLevel = Object.keys(gameConfig.settings());
        const gameStats = {};
        const currentLevelSettings = gameConfig.settings()[0]
        for(const level of totalLevel) {
            gameStats[level] = {
                submittedAt: [],
                isCorrect: [],
                totalScore: 0
            }
        }
        this.setState({
            currentLevelSettings,
            totalLevel,
            gameStats
        })
    }

    updateCurrentLevel (level) {
        const currentLevelSettings = gameConfig.settings()[`${level}`]
        this.setState({
            currentLevel: level,
            currentLevelSettings
        });
    }

    updateGameStats (level, isCorrect, submittedAt, totalScore) {
        let gameStats = {...this.state.gameStats}
        const overallTotal = this.state.totalScore + totalScore
        gameStats[`${level}`] = {
            submittedAt: this.state.gameStats[`${level}`].submittedAt === undefined ? [submittedAt] : [...this.state.gameStats[`${level}`].submittedAt, submittedAt],
            isCorrect: this.state.gameStats[`${level}`].isCorrect === undefined ? [isCorrect] : [...this.state.gameStats[`${level}`].isCorrect, isCorrect],
            totalScore: this.state.gameStats[`${level}`].totalScore + totalScore
        }
        this.setState({gameStats});
        this.setState({totalScore: overallTotal});
    }

    updateStartTime (startTime) {
        this.setState({
            startTime: this.state.startTime === undefined ? [startTime] : [...this.state.startTime, startTime],
            viewGame: true
        })
    }
 
    render () {
        return (
            <React.Fragment>
                {this.state.viewGame === true ? 
                    <div className="gameContainer">
                        <h1>Level: {this.state.currentLevel}</h1>
                        <DragglebleList 
                            items={[...Array(this.state.currentLevelSettings.items).keys()]} 
                            winningOrder={this.state.currentLevelSettings.winningOrder} 
                            img={this.state.currentLevelSettings.assets[1]}
                            level={this.state.currentLevel}
                            updateGameStats={this.updateGameStats}
                        />
                        <ListOptions
                        />
                        <SelectLevelBoard 
                            totalLevel={this.state.totalLevel} 
                            updateCurrentLevel={this.updateCurrentLevel}
                        />
                        <ScoreBoard
                            totalScore={this.state.totalScore}
                        />
                    </div>
                    : 
                    <WelcomeBoard 
                        updateStartTime = {this.updateStartTime}
                    />
                } 
            </React.Fragment>
        )
    }
}

export default PuzzleGame