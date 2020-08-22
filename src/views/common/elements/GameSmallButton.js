import React from 'react';

function GameSmallButton(props) {
  return (
    <button
        style = {{
            padding: '20px',
            border: 'none',
            fontFamily: 'Luckiest Guy',
            fontSize: '24px',
            marginTop: '0px',
            borderRadius: '5px',
            backgroundColor: '#009688',
            color: 'white',
            marginLeft: '5px',
            marginRight: '5px',
        }}
    >{props.text}
    </button>
  );
}

export default GameSmallButton;
