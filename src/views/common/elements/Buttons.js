import React, {useState} from 'react';

function Button(props) {
  const [hoverState, setHoverState] = useState(false)

  const hoverIn = () => {
    setHoverState ({hoverState : true})
  }
  const hoverOut = () => {
    setHoverState ({hoverState : false})
  }
  const styleOnOff = {
    backgroundColor: '#009688',
    padding: '20px',
    border: 'none',
    borderRadius: '3px',
    color: 'white',
    margin: '5px',
  }
  const styleOnHover = {
    backgroundColor: '#004f48',
    padding: '20px',
    border: 'none',
    borderRadius: '3px',
    color: 'white',
    margin: '5',
    cursor:'pointer'
  }
  let style = hoverState? styleOnHover : styleOnOff

  console.log(hoverState)
          
  return (
    <button
        type ={props.type}
        style = {style}
        onClick= {props.onClick}
        onMouseEnter={hoverIn}
        onMouseLeave={hoverOut}
    >{props.text}
    </button>
  );
}

export default Button;
