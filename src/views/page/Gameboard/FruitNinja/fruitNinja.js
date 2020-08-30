//DEPENDENCIES
import React, {Component} from 'react';
import gameConfig from './config/gameSettings';
import isEqual from 'lodash.isequal';
import gameUtils from '../utils/stats/utils';

//GAME STANDARD MODELS
import GameStatsModel from '../../../../models/GameStats';
import LevelStatsModel from '../../../../models/LevelStats';

//COMPONENTS
import SelectLevelBoard from '../../../common/components/SlidingBoard/selectLevelBoard';
import WelcomeBoard from '../../../common/components/SlidingBoard/welcomeBoard';
import ScoreBoard from '../../../common/components/SlidingBoard/scoreBoard';
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
        this.updateStartTime = this.updateStartTime.bind(this);
        this.updateCurrentLevel = this.updateCurrentLevel.bind(this);
    }

    setCurrentLevelSettings (level) {
        let currentLevelSettings = {
            img: [],
            positions: [],
            size: [],
            winningCriteria: gameConfig.settings()[level].winningCriteria
        };
        for (const itemObj of gameConfig.settings()[level].items) {
            currentLevelSettings.img.push(itemObj.img);
            currentLevelSettings.positions.push({x: itemObj.x, y: itemObj.y});
            currentLevelSettings.size.push(itemObj.size);
        }
        return currentLevelSettings;
    }

    componentDidMount () {
        const totalLevel = Object.keys(gameConfig.settings());
        const currentLevelSettings = this.setCurrentLevelSettings(0);
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

    updateStartTime (startTime) {
        this.setState({
            startTime: this.state.startTime === undefined ? [startTime] : [...this.state.startTime, startTime],
            viewGame: true
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

    updateCurrentLevel (level) {
        const currentLevelSettings = this.setCurrentLevelSettings(level)
        this.setState({
            currentLevel: level,
            currentLevelSettings
        });
    }

    updateGameStats () {
        const level = this.state.currentLevel;
        let gameStats = {...this.state.gameStats}
        let currentOrder = {...this.state.currentOrder}
        const {isCorrect, submitTime, score} = gameUtils.getSubmissionStats(
            this.getCurrentBasketOrder(),
            this.state.currentLevelSettings.winningCriteria.items
        )
        const overallTotal = this.state.totalScore + score;
        const updatedGameStats = gameUtils.updateDefaultGameStatsObj(gameStats, level, submitTime, isCorrect, score);
        gameStats[`${level}`].currentState = {...this.state.gameStats[this.state.currentLevel].currentState};
        gameStats[`${level}`].currentBasket = [...this.state.gameStats[this.state.currentLevel].currentBasket];
        currentOrder.order.current = this.state.gameStats[this.state.currentLevel].currentBasket
        this.setState({
            gameStats,
            totalScore: overallTotal,
            currentOrder
        });
        console.log(this.state.gameStats)
    }
    
    render() {
        if(this.state.currentLevel == null) {
            return (
                <div>insert loading screen here</div>
            )
        }
        return (
            <React.Fragment>
                {this.state.viewGame === true ? 
                    <div className='gameContainerFruitNinja'>
                        <div>
                            <h1>Level: {this.state.currentLevel}</h1>
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
                                order={this.state.currentOrder.order} 
                                winningOrder={this.state.currentLevelSettings.winningCriteria.items} 
                                updateStats={this.updateGameStats}/>
                        </div>
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
                    :
                    <WelcomeBoard 
                        updateStartTime = {this.updateStartTime}
                        backgroundImg={'https://i.imgur.com/EaRny9V.png'}
                        gameTitle={'Fruit Ninja'}
                    />
                }
            </React.Fragment>
        )
    }
}

export default FruitNinja;