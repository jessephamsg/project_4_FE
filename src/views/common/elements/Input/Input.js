//DEPENDENCIES
import React from 'react';

//STYLES
import './style_module.css';


const Input = (props) => {
    return (
        <input 
            className="input"
            type={props.type}
            name={props.name}
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange}
            require = {props.require}
        />    
    )
}

export default Input