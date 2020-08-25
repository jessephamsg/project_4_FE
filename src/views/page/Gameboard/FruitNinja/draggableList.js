// Adapted from: https://github.com/chenglou/react-motion/tree/master/demos/demo8-draggable-list

//DEPENDENCIES
import React, { useRef, useState } from 'react';
import { useDrag } from 'react-use-gesture';
import { useSpring, useSprings, animated, interpolate } from 'react-spring';

//COMMON COMPONENTS
import SubmitButton from '../../../common/components/SubmitButton';

//STYLES
import './style_module.css';


const DraggableList = ({ item }) => {

    const initialX = Math.floor(Math.random() * 200 );
    const initialY = Math.floor(Math.random() * 100 );
    const [{ x, y }, set] = useSpring(() => ({ x: initialX, y: initialY }))
    const bind = useDrag(
        ({ movement: [mx, my], tap }) => { set({ x: mx , y: my }) },
        { filterTaps: true }
    )
  
  return (
    <div>
        <div>
          <animated.div
            {...bind()}
            style={{
                transform: interpolate([x, y], (x, y) => `translate3d(${x}px,${y}px,0)`),
                backgroundImage: `url(${require(`./config/assets/${item}.png`)})`,
            }}
            className = "fruitWrapper"
          />
      </div>
      {/* <SubmitButton /> */}
    </div>
  )
}

export default DraggableList;
