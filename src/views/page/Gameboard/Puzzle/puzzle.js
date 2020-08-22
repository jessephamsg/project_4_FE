import React, {Component} from 'react';
import DragglebleList from './draggableList';
import SelectLevelBoard from '../../../common/components/SlidingBoard/selectLevelBoard';
import WelcomeBoard from '../../../common/components/SlidingBoard/welcomeBoard';
import ScoreBoard from '../../../common/components/SlidingBoard/scoreBoard';
import './style_module.css';


class PuzzleGame extends Component {

    constructor (props) {
        super (props) 
        this.state = {
            totalLevel: 5,
            currentLevel: 0,
            totalScore: 0,
            currentLevelSettings: {
                items: 4,
                winningOrder: [0, 3, 2, 1],
                assets: ['https://imgur.com/UEO12ij', 'https://imgur.com/CdSGRWS', 'https://imgur.com/x6BBBlX', 'https://imgur.com/LV2iqWS']
            },
            startTime: [],
            pauseTime: [],
            viewGame: false,
            gameStats: {
                0: {
                    submittedAt: [],
                    isCorrect: [],
                    totalScore: 0
                },
                1: {
                    submittedAt: [],
                    isCorrect: [],
                    totalScore: 0
                },
                2: {
                    submittedAt: [],
                    isCorrect: [],
                    totalScore: 0
                },
                3: {
                    submittedAt: [],
                    isCorrect: [],
                    totalScore: 0
                },
                4: {
                    submittedAt: [],
                    isCorrect: [],
                    totalScore: 0
                }
            },
            viewBoard: false
        }
        this.updateCurrentLevel = this.updateCurrentLevel.bind(this);
        this.updateGameStats = this.updateGameStats.bind(this);
        this.updateStartTime = this.updateStartTime.bind(this);
    }

    //componentDidMount to update the first state. create gameStatsObject using totalLevel. 
    //for now gametstats obj is manual, but after API is connected do it using function

    updateCurrentLevel (level) {
        this.setState({currentLevel: level});
        //update all other settings using API call
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
                            img={this.state.currentLevelSettings.assets}
                            level={this.state.currentLevel}
                            updateGameStats={this.updateGameStats}
                        />
                        <SelectLevelBoard 
                            totalLevel={[...Array(this.state.totalLevel).keys()]} 
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