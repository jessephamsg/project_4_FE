import React from 'react';

function ActionBtn(props) {
    const style = {
        fontFamily: 'Lato, "sans-serif"',
        fontSize :'50px',
        backgroundColor : 'rgba(0,0,0,0)',
        border: '0.1rem solid black',
        minWidth: '100px',
        height :'100px',
        borderRadius: '50%',
        textAlign: 'center',
        margin :'1rem',
        padding : '0.5rem'
    }
  return (
    <button
        style = {style} 
        onClick={props.onClick}>
        {props.text}
    </button>
  );
}

export default ActionBtn;