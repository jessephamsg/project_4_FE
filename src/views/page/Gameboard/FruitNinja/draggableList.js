//DEPENDENCIES
import React from 'react';
import { useDrag } from 'react-use-gesture';
import { useSpring, animated, interpolate } from 'react-spring';

//STYLES
import './style_module.css';


const DraggableList = ({ item, position, size, winningCriteria, updateItemPositions, id, level }) => {

    const initialX = position.x;
    const initialY = position.y;

    const [{ x, y }, set] = useSpring(() => ({ 
      x: initialX, 
      y: initialY,
    }))

    const bind = useDrag(
        ({ args: [item, id], down, offset: [mx, my] ,tap}) => {
          set({ x: mx , y: my , immediate: down})
          updateItemPositions(item, level, id, mx, my); 
        },
        { 
          filterTaps: true, 
          delay: 500,
          threshold: 10,
          bounds: { left: 220, right: 1100, top: 130, bottom: 700 }
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
