import React from 'react';

function GameH2(props) {
  return (
    <h2
        style = {{
            fontFamily: 'Luckiest Guy',
            fontSize: '40px',
            color: 'blueviolet',
            textShadow: '7px 7px #ffdfa5',
        }}
    >{props.text}
    </h2>
  );
}

export default GameH2;
