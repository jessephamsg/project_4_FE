import React from 'react'

function Input(props) {
    const handleChange = (event) => {
        event.preventDefault()
        props.onChange(event)
    }
    return (
        <input 
            type={props.type}
            name={props.name}
            placeholder={props.placeholder}
            value={props.value}
            onChange={(e) => {handleChange(e)}}
        >    
        </input>
    )
}

export default Input