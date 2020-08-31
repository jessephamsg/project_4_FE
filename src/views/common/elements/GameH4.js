import React from 'react';

function GameH4(props) {
  return (
    <h4
        style = {{
            fontFamily: "'Quicksand', 'sans-serif'",
            fontWeight: '700',
            fontSize: '100px',
            color: 'blueviolet',
            textShadow: '7px 7px #ffdfa5',
            margin: '0px',
        }}
    >{props.text}
    </h4>
  );
}

export default GameH4;
