import React, { Component, Fragment } from 'react'
import './style_module.css'
import Button from '@material-ui/core/Button'


export class LandingPage extends Component {


    render() {
        return (
            <Fragment>
                <div className='landingpage'>
                    <h1>Hello there</h1>
                    <p>About this app</p>
                </div>
                <div className='nav'>
                    <Button id='loginBtn' variant="contained" href='/login'>login</Button>
                    <Button id='signupBtn' variant="contained" href='/register'>Sign Up</Button>
                    
                </div>
            </Fragment>
        )
    }
}

export default LandingPage
