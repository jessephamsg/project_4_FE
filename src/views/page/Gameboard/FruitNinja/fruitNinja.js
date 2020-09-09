//DEPENDENCIES
import React, {Component} from 'react';
import gameConfig from './config/gameSettings';
import {AuthService} from '../../../../interactions/AuthService';

//INTERACTION LOGIGS
import gameInteractions from '../../../../interactions/GamePlay'
import gameUtils from '../../../../interactions/GamePlay/utils/utils';

//COMPONENTS
import SelectLevelBoard from '../../../common/components/SlidingBoard/selectLevelBoard';
import WelcomeBoard from '../../../common/components/SlidingBoard/welcomeBoard';
import ScoreBoard from '../../../common/components/SlidingBoard/scoreBoard';
import SubmitButton from '../../../common/components/SubmitButton';
import DraggableList from './draggableList';
import LoadingScreen from '../../LoadingPage';

//STYLES
import layout from '../../../common/layouts/gameContainer.styles.css';
import './style_module.css';



class FruitNinja extends Component {

    static contextType = AuthService

    constructor(props) {
        super(props)
        this.state = gameInteractions.InitialiseState.buildIntialStates();
        this.updateItemPositions=this.updateItemPositions.bind(this);
        this.updateGameStats=this.updateGameStats.bind(this);
        this.updateStartTime = this.updateStartTime.bind(this);
        this.updateCurrentLevel = this.updateCurrentLevel.bind(this);
    }

    componentDidMount () {
        this.setGameSettings();
    }

    async setGameSettings () {
        const {totalLevel, currentLevel, currentOption} = gameInteractions.InitialiseState.getLatestLocalGameState(gameConfig, this.props.gameName, this.props.kidName);
        const gameStats = {};
        for(const level of totalLevel) {
            gameStats[level] = gameInteractions.InitialiseState.buildInitialKeyGameStats();
            gameStats[level].currentState = {};
        }
        const gameID = await gameInteractions.InitialiseState.getGameID(this.props.gameName);
        const totalScore = await gameInteractions.InitialiseState.getTotalScore(this.props.kidName, this.context.userId, gameID); 
        this.setState({
            id: gameID,
            totalScore, 
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

    updateGameStats () {
        const level = this.state.currentLevel;
        let gameStats = {...this.state.gameStats}
        let currentOrder = {...this.state.currentOrder}
        const {isCorrect, submitTime, score} = gameUtils.getSubmissionStats(
            this.getCurrentBasketOrder(),
            this.state.currentLevelSettings.winningCriteria.items
        )
        const overallTotal = this.state.totalScore + score;
        const updatedGameStats = gameInteractions.UpdateState.updateDefaultGameStatsObj(gameStats, level, submitTime, isCorrect, score);        
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
        const parentID = this.context.userId;
        const kidName = this.props.kidName;
        await gameInteractions.UpdateState.updateKidsStats(gameID, level, levelStatsState, parentID, kidName);
    }

    updateCurrentLevel (level) {
        this.setState({
            currentLevel: level,
            currentLevelSettings: this.setCurrentLevelSettings(level)
        });
        gameInteractions.UpdateState.updateLocalViewState(this.props.kidName, this.props.gameName, level, 1)
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
                <LoadingScreen
                    text = 'Loading Game...'
                />
            )
        }
        return (
            <React.Fragment>
                {this.state.viewGame === true ? 
                <div className='gameContainerWrapper'>
                    <div className='gameContainerFruitNinja'>
                        <div>
                            <h1 className='fruitNinjaH1'>Level: {this.state.currentLevel}</h1>
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
                                updateStats={this.updateGameStats}
                                top = '-70px'
                                left = '462px'
                                topEmoji = '-70px'
                                leftEmoji = '460px'
                            />
                        </div>
                        <div className='gameStatsBoardsFruitNinja'>
                            <SelectLevelBoard 
                                totalLevel={this.state.totalLevel} 
                                updateCurrentLevel={this.updateCurrentLevel}
                            />
                            <ScoreBoard
                                totalScore={this.state.totalScore}
                            />
                        </div>
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