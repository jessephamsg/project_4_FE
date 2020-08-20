import React, { Component } from 'react'
import './style_module.css'

export class ChildCard extends Component {

    render() {
        return (
            <div className='childCard'>
                <div className='icon_container'>
                    <img className='childIcon' src={this.props.icon} alt= 'childname' title='childname'/>
                </div>
                <h1> {this.props.childname}</h1>
            </div>
        )
    }
}

export default ChildCard
