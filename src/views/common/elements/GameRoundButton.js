import React from 'react';

function GameRoundButton(props) {
  return (
    <button
        style = {{
            padding: '30px',
            border: 'none',
            borderRadius: '100px',
            backgroundColor: '#009688',
            backgroundImage:`url(${`${props.icon}`})`,
            backgroundSize: '30px',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            boxShadow: '2px 4px 15px 8px #026d6326',
            marginTop: '5px',
        }}
    >
    </button>
  );
}

export default GameRoundButton;
