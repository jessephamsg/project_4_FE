import React from 'react';

function Button(props) {
  return (
    <button
        style = {{
            backgroundColor: '#009688',
            padding: '20px',
            border: 'none',
            borderRadius: '3px',
            color: 'white',
        }}
    >{props.text}
    </button>
  );
}

export default Button;
