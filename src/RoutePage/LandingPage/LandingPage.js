import React, { Component, Fragment } from 'react'
import './style_module.css'


export class LandingPage extends Component {


    render() {
        return (
            <Fragment>
                <div className='landingpage'>
                    <h1>Hello there</h1>
                    <p>About this app</p>
                </div>
                <div className='nav'>
                        <a href='/login'><button>login</button></a>
                        <a href='/register'><button>Sign up</button></a>
                    </div>
            </Fragment>
        )
    }
}

export default LandingPage
