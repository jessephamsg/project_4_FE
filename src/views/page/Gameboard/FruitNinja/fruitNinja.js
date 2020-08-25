//DEPENDENCIES
import React, {Component} from 'react';
import gameConfig from './config/gameSettings';

//GAME STANDARD MODELS
import GameStatsModel from '../../../../models/GameStats';
import LevelStatsModel from '../../../../models/LevelStats';

//COMPONENTS
import DraggableList from './draggableList';

//STYLES
import './style_module.css';


class FruitNinja extends Component {

    constructor(props) {
        super(props)
        this.state = GameStatsModel.gameInitialState();
        this.updateItemPositions=this.updateItemPositions.bind(this);
        this.updateGameStats=this.updateGameStats.bind(this);
    }

    setCurrentLevelSettings () {
        let currentLevelSettings = {
            img: [],
            positions: [],
            size: [],
            winningCriteria: gameConfig.settings()[0].winningCriteria
        };
        for (const itemObj of gameConfig.settings()[0].items) {
            currentLevelSettings.img.push(itemObj.img);
            currentLevelSettings.positions.push({x: itemObj.x, y: itemObj.y});
            currentLevelSettings.size.push(itemObj.size);
        }
        return currentLevelSettings;
    }

    componentDidMount () {
        const totalLevel = Object.keys(gameConfig.settings());
        const gameStats = {};
        const currentLevelSettings = this.setCurrentLevelSettings();
        for(const level of totalLevel) {
            gameStats[level] = LevelStatsModel.levelInitialStats();
            gameStats[level].currentState = {};
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

    updateItemPositions (level, id, x, y) {
        let currentGameStats = {...this.state.gameStats};
        currentGameStats[`${level}`].currentState[`${id}`] = {x, y}
        this.setState({gameStats: currentGameStats});
    }

    updateGameStats () {
        const currentStats = this.state.gameStats[this.state.currentLevel];
        const winningCondition = this.state.currentLevelSettings.winningCriteria;
        const currentGameState = currentStats.currentState;
        const numberOfItems = Object.keys(currentGameState).length;
        const isCorrect = []
        if(numberOfItems === winningCondition.freq) {
            for (const item in currentGameState) {
                currentGameState[item].x < winningCondition.xMax && currentGameState[item].x > winningCondition.xMin && currentGameState[item].y < winningCondition.yMax && currentGameState[item].y > winningCondition.yMin ?
                isCorrect === undefined? isCorrect = [false] : isCorrect.push(false) :
                isCorrect === undefined? isCorrect =[true] : isCorrect.push(true)
                }
        } else {
            isCorrect === undefined? isCorrect = [false] : isCorrect.push(false) 
        }
        const result = isCorrect.every(check => {return check===true});
        currentStats.isCorrect == undefined? currentStats.isCorrect = [result] : currentStats.isCorrect.push(result);
        console.log(currentStats)
    }
    
    render() {
        if(this.state.currentLevel == null) {
            return (
                <div>insert loading screen here</div>
            )
        }
        return (
            <div className='gameContainerFruitNinja'>
                {this.state.currentLevelSettings.img.map((item, index) => {
                    return (
                        <DraggableList 
                            item={item} 
                            position={this.state.currentLevelSettings.positions[index]}
                            size={this.state.currentLevelSettings.size[index]}
                            winningCriteria={this.state.currentLevelSettings.winningCriteria}
                            updateItemPositions={this.updateItemPositions}
                            level={this.state.currentLevel}
                            id={index}
                        />
                    )
                })}
                <button onClick={this.updateGameStats}>
                    Check answer
                </button>
            </div>
        )
    }
}

export default FruitNinja;