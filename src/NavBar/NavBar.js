import React, { Component, Fragment } from 'react'
import './style_module.css'

export class NavBar extends Component {

    render() {
        return (
            <div className='navbar'>
                <ul>
                    <li><a href='/'>Home</a></li>
                    <li><a href='/'>Search</a></li>
                    <li>Project 4 title</li>
                    <li>
                            <input type='text' name='search' placeholder='search'></input>
                            <button type= 'submit' name='search'>Search</button>
                    </li>
                <li><a href='/dashboard'>Parent Dashboard</a></li> {/*child protection system*/}
                </ul>
            </div>
        )
    }
}

export default NavBar
