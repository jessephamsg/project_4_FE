//DEPENDENCIES
import React from 'react';


const GameH2 = (props) => {
  return (
    <h2
        style = {{
            fontFamily: "'Quicksand', 'sans-serif'",
            lineHeight: '60px',
            fontWeight: '700',
            fontSize: '60px',
            color: 'blueviolet',
        }}
    >{props.text}
    </h2>
  );
}

export default GameH2;
