//DEPENDENCIES
import React from 'react';

//STYLES
import './style_module.css';


const ChildCard = (props) => {
    return (
        <div className='childCard'>
            <a href= {`/games/${props.childname}`} >
                <div className='icon_container'>
                    <img className='childIcon' src={props.icon} alt= 'childname' title='childname'/>
                </div>
                <h2> {props.childname} </h2>
            </a>
        </div>
    )

}

export default ChildCard
