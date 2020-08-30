// Adapted from: https://github.com/chenglou/react-motion/tree/master/demos/demo8-draggable-list

//DEPENDENCIES
import React, { useRef } from 'react';
import clamp from 'lodash-es/clamp';
import swap from 'lodash-move';
import { useDrag } from 'react-use-gesture';
import { useSprings, animated, interpolate } from 'react-spring';
import gameUtils from '../stateControllers/utils/utils'

//COMMON COMPONENTS
import SubmitButton from '../../../common/components/SubmitButton';

//STYLES
import './style_module.css';


const setCardPosition = (order, down, originalIndex, curIndex, y) => {
  return (
    index => {
      return (
        down && index === originalIndex
          ? { y: curIndex * 150 + y }
          : { y: order.indexOf(index) * 150}
      )
    }
  )
}

const DraggableList = ({ items, winningOrder, img, currentOption, level, updateGameStats }) => {

  const order = useRef(items.map((_, index) => index)) 
  const [springs, setSprings] = useSprings(items.length, setCardPosition(order.current)) 

  const bind = useDrag(({ args: [originalPosition], down, movement: [, y] }) => {
    const currentPosition = order.current.indexOf(originalPosition)
    const curRow = clamp(Math.round((currentPosition * 100 + y) / 100), 0, items.length - 1);
    const newOrder = swap(order.current, currentPosition, curRow);
    setSprings(setCardPosition(newOrder, down, originalPosition, currentPosition, y)) 
    if (!down) order.current = newOrder;
  })

  const updateStats = () => {
    const {isCorrect, submitTime, score} = gameUtils.getSubmissionStats(order.current, winningOrder);
    updateGameStats(level, isCorrect, submitTime, score);
  }
  
  return (
    <div className="content">
      <div className="listWrapper" style={{ height: items.length * 210 }}>
        {springs.map(({ y }, i) => (
          <animated.div
            {...bind(i)}
            key={i}
            style={{
              transform: interpolate([y], (y) => `translate3d(0,${y}px,0)`),
              backgroundImage: `url(${require(`./config/assets/${img[currentOption][i]}.png`)})`,
            }}
            className = "draggableDiv"
            children={items[i]}
          />
        ))}
      </div>
      <SubmitButton order={order} winningOrder={winningOrder} updateStats={updateStats}/>
    </div>
  )
}

export default DraggableList;
