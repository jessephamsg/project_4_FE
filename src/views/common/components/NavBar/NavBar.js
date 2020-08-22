import React, { Component, Fragment } from 'react'
import Button from '../../elements/Buttons';
import './style_module.css'


export class NavBar extends Component {
    action = () => {
        window.location.href = '/register'
    }

    render() {
        return (
            <div className='navbar'>
                <ul>
                    <div className='navBarLeft'>
                        <li>Project 4 logo</li>
                        <li><a href='/'>About us</a></li>
                        <li><a href='/'>Our Games</a></li>
                    </div>
                    <div className='navBarRight'>
                        {/* <a href='/register'><Button text={'Sign Up'} onClick = {this.action}></Button></a> */}
                        <Button text={'Sign Up'} onClick = {this.action}></Button>
                        <a href='/login'><Button text={'Log In'}></Button></a>
                    </div>
                </ul>
            </div>
        )
    }
}

export default NavBar
