import React, { Component } from 'react'
import './style_module.css'

export class ChildReport extends Component {

    render() {
        return (
            <div className='ChildReport'>
                <a href= {`/child/${this.props.childname}/report`}>
                <div className='icon_container'>
                    <img className='childIcon' src={this.props.icon} alt= 'childname' title='childname'/>
                </div>
                    <h2> {this.props.childname} statistic </h2>
                </a>
            </div>
        )
    }
}
export default ChildReport
