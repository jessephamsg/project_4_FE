//DEPENDENCIES
import React, { Component, Fragment } from 'react'; 
import { withRouter } from 'react-router-dom';

//COMMON ELEMENTS
import Button from '../../elements/Buttons';
import AuthorizeModal from '../Modal/AuthorizeModal';

//INTERACTION LOGICS
import loggingInteractions from '../../../../interactions/Logging';
import {AuthService} from '../../../../interactions/AuthService';

//STYLES
import './style_module.css';


export class NavBar extends Component {

    state= {
        isAuthorizeModalOpen : false
    }
    
    static contextType = AuthService

    logout = async () => {
        await loggingInteractions.Logging.logout();
        window.location.href = '/'
    }

    toggleAuthorizeModal = () => {
        this.setState({
            isAuthorizeModalOpen : !this.state.isAuthorizeModalOpen
        })
    }

    authorize = () => {
        this.toggleAuthorizeModal()
    }

    goToParentDashboard = async () => {
        this.props.history.push(`/dashboard/${this.context.user}`)
    }

    checkSuccess = (result) => {
        if (result) {
            this.toggleAuthorizeModal()
            this.goToParentDashboard()
        } else alert('you are not authorized')
    }

    render() {

        const routeTo = this.props.history

        return (
            <Fragment>
            <div className='navBar'>
               
                <ul className='navBarItem'>
                    <div className='navBarLeft'>
                        <li className='navLink' onClick={()=> {routeTo.push(`/`)}}>Project 4 logo</li>
                        <li className='navLink' onClick={()=> {routeTo.push(`/`)}}><a href='#about'> About us </a></li>
                        <li className='navLink' onClick={()=> {routeTo.push(`/`)}}><a href='#games'>Our Games</a></li>
                    {!this.context.user ? null :
                        <li className='navLink' onClick={()=> {routeTo.push(`/home/${this.context.user}`)}}>Home</li>
                    }
                    </div>
                    {!this.context.user ? 
                    <div className='navBarRight'>
                        <Button className='navBtn' text={'Sign Up'} onClick={() => routeTo.push('/register')}></Button>
                        <Button className='navBtn' text={'Log In'} onClick={() => routeTo.push('/login')}></Button>
                    </div> 
                    :
                    <div className='navBarRight'>
                        <Button className='navBtn' text={'Dashboard'} onClick={this.authorize}></Button>
                        <Button className='navBtn' text={'Log Out'} onClick ={this.logout}></Button> 
                    </div>
                    }
                </ul>
            </div>
             {this.state.isAuthorizeModalOpen?
                <AuthorizeModal 
                    isAuthorizeModalOpen={this.state.isAuthorizeModalOpen}
                    toggleAuthorizeModal= {this.toggleAuthorizeModal}
                    checkSuccess={this.checkSuccess}/> 
                :
                null}
            </Fragment>
        )
    }
}

export default withRouter(NavBar)
