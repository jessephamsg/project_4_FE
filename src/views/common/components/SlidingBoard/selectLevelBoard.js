//DEPENDENCIES
import React, {useState} from 'react';
import {useSpring, animated} from 'react-spring';

//COMMON STYLES
import slidingBoardAnimation from './animation';
import './style_module.css';

//COMMON ASSETS
import GameH3 from '../../elements/GameH3';


const SelectLevelBoard = (props) => {

    const [isShowing, showBoard] = useState(false);
    const boardProps = useSpring(slidingBoardAnimation.animateBoardSlide(isShowing))

    const updateCurrentLevel = (e) => {
        const level = e.target.value;
        props.updateCurrentLevel(level);
    }

    return (
        <React.Fragment>
            <button onClick={() => showBoard(!isShowing)}>Levels</button>
            <animated.div 
                style={boardProps}
                className="selectLvlBoardWrapper"
            >
                <div className="selectLvlBoard">
                <div className="scoreBoardContainer">
                    <div className="scoreBoardContainerH3">
                        <GameH3 text={'Choose a Level'}/>
                    </div>
                    <div className="levelButtonContainer">
                        {props.totalLevel.map(level => {
                            return (
                                <button 
                                    onClick={(e) => {
                                        updateCurrentLevel(e);
                                        showBoard(!isShowing)
                                    }}
                                    className="levelButtons"
                                    value={level}
                                    >
                                    {level}
                                </button>
                            )
                        })}
                    </div>
                </div>
                </div>
            </animated.div>
        </React.Fragment>
    )
}

export default SelectLevelBoard;