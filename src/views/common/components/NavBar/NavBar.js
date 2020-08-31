//DEPENDENCIES
import React, { Component, Fragment, useContext } from 'react'
import { withRouter } from 'react-router-dom'

//COMMON ELEMENTS
import Button from '../../elements/Buttons';

//INTERACTION LOGICS
import loggingInteractions from '../../../../interactions/Logging'
import {AuthService} from '../../../../interactions/AuthService'

//STYLES
import './style_module.css'


export class NavBar extends Component {
    
    static contextType = AuthService

    logout = async () => {
        await loggingInteractions.Logging.logout();
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
