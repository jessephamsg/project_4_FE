import React, { Component, Fragment } from 'react'
import ChildCard from '../../Component/Card/ChildCard'
import './style_module.css'


export class HomePage extends Component {

    render() {
        return (
            <Fragment>
                <div className='homepage'>
                    <h1>Hi friend, What is your name?</h1>
                    <div className='childList'>
                        <ChildCard childname='Matty' icon={'https://i.imgur.com/1JCz8yg.png'}/>
                        <ChildCard childname='Patty' icon={'https://i.imgur.com/1JCz8yg.png'}/>
                        <ChildCard childname='Stacy' icon={'https://i.imgur.com/1JCz8yg.png'}/>
                        <ChildCard childname='Brandy' icon={'https://i.imgur.com/1JCz8yg.png'}/>
                        <ChildCard childname='Freddy' icon={'https://i.imgur.com/1JCz8yg.png'}/>
                        <ChildCard childname='Eddie' icon={'https://i.imgur.com/1JCz8yg.png'}/>
                    </div>
                </div>
                
            </Fragment>
        )
    }
}

export default HomePage
