import React, { Component, Fragment, useContext } from 'react'
import Button from '../../elements/Buttons';
import './style_module.css'
import {AuthService} from '../../../../services/AuthService'
import apis from '../../../../api';
import local from '../../../../storage/localStorage';
import { withRouter } from 'react-router-dom'



export class NavBar extends Component {
    
    static contextType = AuthService

    logout = async () => {
        const logout = await apis.logOut()
        console.log(logout.data)
        local.del('currentUser')
        local.del('currentID')
        window.location.href = '/'
        
    }
    goToParentDashboard = async () => {
        this.props.history.push(`/dashboard/${this.context.user}`)
    }

    render() {
        console.log(this.context)
        console.log(this.props)
        const routeTo = this.props.history
        return (

            <div className='navBar'>
                <ul className='navBarItem'>
                    <div className='navBarLeft'>
                        <li>Project 4 logo</li>
                        <li className='navLink' onClick={()=> {routeTo.push(`/about`)}}> About us</li>
                        <li className='navLink' onClick={()=> {routeTo.push(`/games`)}}>Our Games</li>
                    {!this.context.user ? null :
                        <li className='navLink' onClick={()=> {routeTo.push(`/home/${this.context.user}`)}}>Home</li>
                    }
                    </div>
                    {!this.context.user ? 
                    <div className='navBarRight'>
                        <Button text={'Sign Up'} onClick={() => routeTo.push('/register')}></Button>
                        <Button text={'Log In'} onClick={() => routeTo.push('/login')}></Button>
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

export default withRouter(NavBar)
