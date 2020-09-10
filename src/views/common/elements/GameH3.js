//DEPENDENCIES
import React from 'react';


const GameH3 = (props) => {

  return (
    <h3
        style = {{
            fontFamily: "'Quicksand', 'sans-serif'",
            fontWeight: '700',
            fontSize: '80px',
            color: 'blueviolet',
            textShadow: '7px 7px #ffdfa5'
        }}
    >
      {props.text}
    </h3>
  );
}

export default GameH3;
