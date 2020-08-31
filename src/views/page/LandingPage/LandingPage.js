//DEPENDENCIES
import React, { Component, Fragment } from 'react'

//STYLES
import './style_module.css';


export class LandingPage extends Component {

    render() {
        return (
            <Fragment>
                <div className='landingpage'>
                    <div className='topSection'>
                        <div className='topLeftSection'>
                            <h1>Joyful learning starts here</h1>
                            <p>Inspire a lifetime of learning and discovery with our free, fun educational program for children ages two to seven.</p>
                        </div>
                        <div className='topRightSection'>
                            <div id='topRightSectionImg'></div>
                        </div>
                        <div></div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default LandingPage
