//DEPENDENCIES
import React, { Component, Fragment } from 'react'; 
import { withRouter } from 'react-router-dom';

//COMMON ELEMENTS
import AuthorizeModal from '../../common/components/Modal/AuthorizeModal';

//INTERACTION LOGICS
import {AuthService} from '../../../interactions/AuthService';

//STYLES
import './style_module.css';


export class Error extends Component {

    static contextType = AuthService

    state= {
        isAuthorizeModalOpen : false
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
        return (
            <Fragment>
                <a className='authorise_link' 
                    onClick={this.authorize}>
                    Are you a parent? Add A Child
                </a>
                {this.state.isAuthorizeModalOpen?
                    <AuthorizeModal 
                        isAuthorizeModalOpen={this.state.isAuthorizeModalOpen}
                        toggleAuthorizeModal= {this.toggleAuthorizeModal}
                        checkSuccess={this.checkSuccess}/> 
                    :
                    null
                }
            </Fragment>
        )
    }
}

export default withRouter(Error);
