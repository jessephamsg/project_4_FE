//DEPENDENCIES
import React, {useState} from 'react';
import {useSpring, animated} from 'react-spring';

//COMMON STYLES
import slidingBoardAnimation from './animation';
import './style_module.css';


const WelcomeBoard = (props) => {

    const [isShowing, showBoard] = useState(true);
    const boardProps = useSpring(slidingBoardAnimation.animateBoardSlide(isShowing));

    const updateStartTime = () => {
        props.updateStartTime(Date.now());
    }

    return (
        <div>
            <animated.div 
                style={boardProps}
                style={{backgroundImage:`url(${props.backgroundImg})`}}
                className="welcomeBoard"
                >
                <div className="welcomeBoardContent">
                    <div className="welcomeBoardTitle">
                        <h5>The</h5>
                        <h1>{props.gameTitle}</h1>
                    </div>
                    <button className="startButton"
                        onClick={(e) => {
                            updateStartTime();
                            showBoard(!isShowing)
                            }}
                    > Start!
                    </button>
                </div>
            </animated.div>
        </div>
    )
}

export default WelcomeBoard;