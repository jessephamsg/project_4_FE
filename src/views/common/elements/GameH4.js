import React from 'react';

function GameH4(props) {
  return (
    <h4
        style = {{
            fontFamily: 'Luckiest Guy',
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
