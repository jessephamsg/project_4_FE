import React from 'react';


function Button(props) {

  const hoverIn = e => {
    e.preventDefault()
    e.target.style.cursor='pointer'
  }

  const style = {
    fontFamily: 'Lato, "sans-serif"',
    fontWeight: '500',
    fontSize : '15px',
    backgroundColor: '#009688',
    paddingLeft: props.size === 'small'? '5px' : '15px',
    paddingRight: props.size === 'small'? '5px' : '15px',
    paddingTop: props.size === 'small'? '10px' : '15px',
    paddingBottom: props.size === 'small'? '10px' : '15px',
    border: 'none',
    borderRadius: '3px',
    color: 'white',
    margin: '5px',
  }
   
  return (
    <button
      id = {props.id}
      className={props.className}
      type ={props.type}
      style = {style}
      onClick= {props.onClick}
      onMouseOver = {hoverIn}
    >{props.text}
    </button>
  );
}

export default Button;
