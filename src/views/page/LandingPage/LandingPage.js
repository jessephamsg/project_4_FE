//DEPENDENCIES
import React, { Component, Fragment } from 'react'

//CHILDREN
import TopSection from './TopSection';
import BodySection from './BodySection';
import GameCardSection from './GameCardSection';

//STYLES
import './style_module.css';


export class LandingPage extends Component {

    render() {
        return (
            <Fragment>
                <div className='pageWrapper'>
                    <TopSection/>
                    <BodySection/>
                    <GameCardSection/>
                    <div className='imageSection'></div>
                </div>
            </Fragment>
        )
    }
}

export default LandingPage
