//DEPENDENCIES
import React, { Component } from 'react'

//STYLES
import './style_module.css'


export class ChildCard extends Component {

    render() {
        return (
            <div className='childCard'>
                <a href= {`/home/dashboard/${this.props.childname}`}>
                <div className='icon_container'>
                    <img className='childIcon' src={this.props.icon} alt= 'childname' title='childname'/>
                </div>
                    <h2> {this.props.childname} </h2>
                </a>
            </div>
        )
    }
}
export default ChildCard
