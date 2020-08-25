//DEPENDENCIES
import React, {Component} from 'react';
import gameConfig from './config/gameSettings';
import { useDrag } from 'react-use-gesture';
import { useSpring, useSprings, animated, interpolate } from 'react-spring';

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
    }

    componentDidMount () {
        const totalLevel = Object.keys(gameConfig.settings());
        const gameStats = {};
        let currentLevelSettings = [];
        for (const itemObj of gameConfig.settings()[0].items) {
            for (let i=0; i < itemObj.freq; i++) {
                currentLevelSettings.push(itemObj.img)
            }
        }
        for(const level of totalLevel) {
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
    
    render() {
        console.log(this.state)
        if(this.state.currentLevel == null) {
            return (
                <div>insert loading screen here</div>
            )
        }
        return (
            <div className='gameContainerFruitNinja'>
                {this.state.currentLevelSettings.map(item => {
                    return (
                        <DraggableList item={item}/>
                    )
                })}
            </div>
        )
    }
}

export default FruitNinja;