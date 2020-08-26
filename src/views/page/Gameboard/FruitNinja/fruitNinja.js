//DEPENDENCIES
import React, {Component} from 'react';
import gameConfig from './config/gameSettings';
import isEqual from 'lodash.isequal';
import gameUtils from '../utils';

//GAME STANDARD MODELS
import GameStatsModel from '../../../../models/GameStats';
import LevelStatsModel from '../../../../models/LevelStats';

//COMPONENTS
import SubmitButton from '../../../common/components/SubmitButton';
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
        const currentLevelSettings = this.setCurrentLevelSettings();
        const gameStats = {};
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

    updateItemPositions (item, level, id, x, y) {
        let currentGameStats = {...this.state.gameStats};
        const isInBasket = this.isInBasket(x, y)
        currentGameStats[`${level}`].currentState[`${id}`] = {item, x, y, isInBasket}
        currentGameStats[`${level}`].currentBasket = []
        this.setState({gameStats: currentGameStats});
    }

    isInBasket (x, y) {
        const winningCondition = this.state.currentLevelSettings.winningCriteria;
        const isInBasket = 
        (x < winningCondition.xMax && x > winningCondition.xMin 
        && y < winningCondition.yMax && y > winningCondition.yMin) === true ?
        true : false
        return isInBasket
    }

    getCurrentBasketOrder () {
        let currentGameStats = {...this.state.gameStats};
        const currentGameState = currentGameStats[this.state.currentLevel].currentState;
        const itemsInBasket = [];
        for (const itemID in currentGameState) {
            if(currentGameState[`${itemID}`].isInBasket) itemsInBasket.push(currentGameState[`${itemID}`].item) 
        }
        currentGameStats[this.state.currentLevel].currentBasket = [...itemsInBasket]
        this.setState({gameStats: currentGameStats});
        return itemsInBasket
    }

    updateGameStats () {
        const level = this.state.currentLevel;
        let gameStats = {...this.state.gameStats}
        const {isCorrect, submitTime, score} = gameUtils.getSubmissionStats(
            this.getCurrentBasketOrder(),
            this.state.currentLevelSettings.winningCriteria.items
        )
        const overallTotal = this.state.totalScore + score;
        const updatedGameStats = gameUtils.updateDefaultGameStatsObj(gameStats, level, submitTime, isCorrect, score);
        gameStats[`${level}`].currentState = {...this.state.gameStats[this.state.currentLevel].currentState};
        gameStats[`${level}`].currentBasket = [...this.state.gameStats[this.state.currentLevel].currentBasket];
        this.setState({gameStats});
        this.setState({totalScore: overallTotal});
        console.log(this.state)
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
                <SubmitButton 
                    order={this.state.gameStats[this.state.currentLevel].currentBasket} 
                    winningOrder={this.state.currentLevelSettings.winningCriteria.items} 
                    updateStats={this.updateGameStats}/>
            </div>
        )
    }
}

export default FruitNinja;