import React, { Component, Fragment, useContext } from 'react'
import Button from '../../elements/Buttons';
import './style_module.css'
import {AuthContext} from '../../../../AuthContext'
import apis from '../../../../api';
import local from '../../../../storage/localStorage';


export class NavBar extends Component {
    static contextType = AuthContext

    logout = async () => {
        const logout = await apis.logOut()
        console.log(logout.data)
        local.del('currentUser')
        local.del('currentID')
        window.location.href = '/'
        
    }
    goToParentDashboard = async () => {
        window.location.href = `/dashboard/${this.context.user}`
    }

    render() {
        console.log(this.context)
        return (

            <div className='navBar'>
                <ul className='navBarItem'>
                    <div className='navBarLeft'>
                        <li>Project 4 logo {this.context.user}</li>
                        <li><a href='/'>About us</a></li>
                        <li><a href='/'>Our Games</a></li>
                        <li><a href={`/home/${this.context.user}`}>Home</a></li>
                    </div>
                    {!this.context.user ? 
                    <div className='navBarRight'>
                        <a href='/register'><Button text={'Sign Up'}></Button></a>
                        <a href='/login'><Button text={'Log In'}></Button></a>
                    </div> 
                    :
                    <div className='navBarRight'>
                        <Button text={'Dashboard'} onClick={this.goToParentDashboard}></Button>
                        <Button text={'Log Out'} onClick ={this.logout}></Button> 
                    </div>
                    }
                </ul>
            </div>

        )
    }
}

export default NavBar
