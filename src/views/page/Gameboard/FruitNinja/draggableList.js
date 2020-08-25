//DEPENDENCIES
import React, { useRef, useState } from 'react';
import { useDrag } from 'react-use-gesture';
import { useSpring, useSprings, animated, interpolate } from 'react-spring';

//COMMON COMPONENTS
import SubmitButton from '../../../common/components/SubmitButton';

//STYLES
import './style_module.css';


const DraggableList = ({ item, position, size, winningCriteria, updateItemPositions, id, level }) => {

    const initialX = position.x;
    const initialY = position.y;

    const [{ x, y }, set] = useSpring(() => ({ 
      x: initialX, 
      y: initialY,
      config: { mass: 5, tension: 350, friction: 40 } 
    }))

    const bind = useDrag(
        ({ args: [item, id], down, offset: [mx, my] ,tap}) => {
          set({ x: mx , y: my , immediate: down})
          if(item === winningCriteria.name) updateItemPositions(level, id, mx, my); 
        },
        { 
          filterTaps: true, 
          delay: 1000,
        }
    )
  
  return (
    <div>
        <div>
          <animated.div
            {...bind(item, id)}
            style={{
                backgroundImage: `url(${require(`./config/assets/${item}.png`)})`,
                position: 'absolute',
                left: x.interpolate(x => `${x}px`),
                top: y.interpolate(y => `${y}px`),
                width: `${size}px`,
                height: `${size}px`
            }}
            className = "fruitWrapper"
          />
      </div>
    </div>
  )
}

export default DraggableList;
