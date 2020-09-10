//DEPENDENCIES
import React, {useState} from 'react';
import {useTransition, animated} from 'react-spring';
import isEqual from 'lodash.isequal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

//STYLES
import './style_module.css';


const SubmitButton = (props) => {

    const [isCorrect, setSubmit] = useState([false]);
    const [isClicked, setClick] = useState(false);
    const value = useTransition(isClicked, null, {
        from: {
            opacity: 0,
            top: props.topEmoji,
            left: props.leftEmoji,
        },
        enter: {
            opacity: 1,
            top: props.topEmoji,
            left: props.leftEmoji,
        },
        leave: {
            opacity: 0,
            top: props.topEmoji,
            left: props.leftEmoji,
        },
        config: { duration: 2000 },
      })

    const updateStats = () => {
        props.updateStats();
    }

    return (
        <React.Fragment>
            {value.map(({item, props, key}) => {
                return (
                    (isCorrect[isCorrect.length-1]===false) ?
                    <animated.div 
                        style={props} 
                        className='resultEmoji'
                    > 
                        &#128557; 
                    </animated.div> :
                    <animated.div 
                        style={props} 
                        className='resultEmoji'
                    > 
                        &#129321; 
                    </animated.div>
                )
            })} 
            <button 
                onClick = {() => {
                updateStats()
                setSubmit([...isCorrect, isEqual(props.order.current, props.winningOrder)]);
                setClick(!isClicked)
                }}
                className='submitButton'
                style = {{
                    top: props.top,
                    left: props.left,
                }}
                >
                <FontAwesomeIcon icon={faPaperPlane} />
            </button>
        </React.Fragment>
    )
}

export default SubmitButton