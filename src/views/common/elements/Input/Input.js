import React from 'react'
import './style_module.css'

function Input(props) {
    return (
        <input 
        className="input"
            type={props.type}
            name={props.name}
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange}
            require = {props.require || false}
        />    
    )
}

export default Input