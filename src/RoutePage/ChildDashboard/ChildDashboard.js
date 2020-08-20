import React, { Component, Fragment } from 'react'
import './style_module.css'

export class ChildDashboard extends Component {

    render() {
        return (
            <Fragment>
                <div className='childProfile'>
                    <div className='icon_container'>
                        <img className='childIcon' src='https://i.imgur.com/1JCz8yg.png' alt= 'childname' title='childname'/>
                    </div>
                <div>
                    <p>{this.props.match.params.childname}</p>
                </div>
                </div>
            </Fragment>
        )
    }
}

export default ChildDashboard
