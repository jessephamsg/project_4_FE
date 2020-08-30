//DEPENDENCIES
import React, {Component} from 'react';
import gameConfig from './config/gameSettings';
import gameUtils from '../utils/stats/utils';

//STATE CONTROLLERS
import stateControllers from '../stateControllers'

//COMPONENTS
import SelectLevelBoard from '../../../common/components/SlidingBoard/selectLevelBoard';
import WelcomeBoard from '../../../common/components/SlidingBoard/welcomeBoard';
import ScoreBoard from '../../../common/components/SlidingBoard/scoreBoard';
import SubmitButton from '../../../common/components/SubmitButton';
import DraggableList from './draggableList';

//STYLES
import './style_module.css';


const gameName = 'fruitNinja';

class FruitNinja extends Component {

    constructor(props) {
        super(props)
        this.state = stateControllers.InitialiseState.buildIntialStates();
        this.updateItemPositions=this.updateItemPositions.bind(this);
        this.updateGameStats=this.updateGameStats.bind(this);
        this.updateStartTime = this.updateStartTime.bind(this);
        this.updateCurrentLevel = this.updateCurrentLevel.bind(this);
    }

    componentDidMount () {
        this.setGameSettings();
    }

    async setGameSettings () {
        const {totalLevel, currentLevel, currentOption} = stateControllers.InitialiseState.getLatestLocalGameState(gameConfig, gameName);
        const gameStats = {};
        for(const level of totalLevel) {
            gameStats[level] = stateControllers.InitialiseState.buildInitialKeyGameStats();
            gameStats[level].currentState = {};
        }
        this.setState({
            name: gameName,
            id: await stateControllers.InitialiseState.getGameID(gameName),
            totalScore: 0, //needs to get from API using Kid's actual ID when kids repo is checked and set up
            currentLevel,
            currentLevelSettings: this.setCurrentLevelSettings(0),
            totalLevel,
            gameStats,
            currentOption
        })
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

    updateGameStats () {
        const level = this.state.currentLevel;
        let gameStats = {...this.state.gameStats}
        let currentOrder = {...this.state.currentOrder}
        const {isCorrect, submitTime, score} = gameUtils.getSubmissionStats(
            this.getCurrentBasketOrder(),
            this.state.currentLevelSettings.winningCriteria.items
        )
        const overallTotal = this.state.totalScore + score;
        const updatedGameStats = stateControllers.UpdateState.updateDefaultGameStatsObj(gameStats, level, submitTime, isCorrect, score);
        gameStats[`${level}`].currentState = {...this.state.gameStats[this.state.currentLevel].currentState};
        gameStats[`${level}`].currentBasket = [...this.state.gameStats[this.state.currentLevel].currentBasket];
        currentOrder.order.current = this.state.gameStats[this.state.currentLevel].currentBasket
        this.setState({
            gameStats,
            totalScore: overallTotal,
            currentOrder
        });
        this.updateKidStats(level, this.state.gameStats);
    }

    async updateKidStats (level, levelStatsState) {
        const gameID = this.state.id;
        const kidID = this.context.userId;//this is currently parentsID need to edit
        await stateControllers.UpdateState.updateKidsStats(gameID, level, levelStatsState, kidID);
    }

    updateCurrentLevel (level) {
        this.setState({
            currentLevel: level,
            currentLevelSettings: this.setCurrentLevelSettings(level)
        });
        stateControllers.UpdateState.updateLocalViewState(gameName, level, 1)
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