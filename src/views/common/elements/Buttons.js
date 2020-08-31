import React, {useState} from 'react';


function Button(props) {
  const [hoverState, setHoverState] = useState(false)

  const hoverIn = e => {
    e.preventDefault()
    e.target.style.cursor='pointer'
    // e.target.style.backgroundColor='#004f48'
  }

  const style = {
    fontFamily: 'Lato, "sans-serif"',
    fontWeight: '500',
    fontSize : '16px',
    backgroundColor: '#009688',
    padding: '15px',
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
