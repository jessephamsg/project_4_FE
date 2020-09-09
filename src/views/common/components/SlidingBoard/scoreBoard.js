//DEPENDENCIES
import React, {useState} from 'react';
import {useSpring, animated} from 'react-spring';

//COMMON STYLES
import slidingBoardAnimation from './animation';
import './style_module.css';

//COMMON ASSETS
import GameSmallButton from '../../elements/GameSmallButton';
import GameRoundButton from '../../elements/GameRoundButton';
import GameH2 from '../../elements/GameH2';
import GameH4 from '../../elements/GameH4';


const ScoreBoard = (props) => {

    const [isShowing, showBoard] = useState(false);
    const boardProps = useSpring(slidingBoardAnimation.animateBoardSlide(isShowing));

    return (
        <React.Fragment>
            <div onClick={(e) => {showBoard(!isShowing)}}>
                <GameRoundButton 
                    icon={'https://icon-library.com/images/white-star-icon-png/white-star-icon-png-29.jpg'}>
                </GameRoundButton>
            </div>
            <animated.div 
                style={boardProps}
                className="scoreBoardWrapper"
            >
                <div className="scoreBoard">
                    <div className="scoreBoardContent">
                        <div className="scoreBoardContentH2">
                            <GameH2 text={'Your Score'}/>
                        </div>
                        <div className="scoreBoardContentH4">
                            <GameH4 text={props.totalScore}/>
                        </div>
                        <div onClick={(e) => {showBoard(!isShowing)}}>
                            <GameSmallButton text={'Continue Playing!'}/>
                        </div>
                    </div>
                </div>
            </animated.div>
        </React.Fragment>
    )
}

export default ScoreBoard;