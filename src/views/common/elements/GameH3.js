import React from 'react';

function GameH3(props) {
  return (
    <h3
        style = {{
            fontFamily: 'Luckiest Guy',
            fontSize: '60px',
            color: 'blueviolet',
            textShadow: '7px 7px #ffdfa5'
        }}
    >{props.text}
    </h3>
  );
}

export default GameH3;
