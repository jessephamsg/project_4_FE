import React, {useState, useEffect} from 'react';

function Button(props) {
  const [hoverState, setHoverState] = useState(false)

  // const hoverIn = () => {
  //   setHoverState ({hoverState : true})
  // }

  const hoverIn = e => {
    e.preventDefault()
    e.target.style.cursor='pointer'
    e.target.style.backgroundColor='#004f48'
  }
  // const hoverOut = () => {
  //   setHoverState ({hoverState : false})
  // }
  const style = {
    fontFamily: 'Schoolbell, cursive',
    fontSize : '16px',
    backgroundColor: '#009688',
    padding: '15px',
    border: 'none',
    borderRadius: '3px',
    color: 'white',
    margin: '5px',
  }
  // const styleOnHover = {
  //   backgroundColor: '#004f48',
  //   padding: '20px',
  //   border: 'none',
  //   borderRadius: '3px',
  //   color: 'white',
  //   margin: '5',
  //   cursor:'pointer'
  // }    
  return (
    <button
        type ={props.type}
        // style = {!hoverState ? style : styleOnHover}
        style = {style}
        onClick= {props.onClick}
        onMouseOver = {hoverIn}
        // onMouseEnter={hoverIn}
        // onMouseLeave={hoverOut}
    >{props.text}
    </button>
  );
}

export default Button;
