import React, { Component, Fragment} from 'react'
import ChildReport from '../../Component/Modal/ChildReport'
import './style_module.css'

export class ParentDashboard extends Component {

    render() {
        return (
            <Fragment>
                <div className='ParentDashboard'>
                    <h1>Hi parent, here are the list of all your children</h1>
                    <div className='childList'>
                        <ChildReport childname='Matty' icon={'https://i.imgur.com/1JCz8yg.png'}/>
                        <ChildReport childname='Patty' icon={'https://i.imgur.com/1JCz8yg.png'}/>
                        <ChildReport childname='Stacy' icon={'https://i.imgur.com/1JCz8yg.png'}/>
                        <ChildReport childname='Brandy' icon={'https://i.imgur.com/1JCz8yg.png'}/>
                        <ChildReport childname='Freddy' icon={'https://i.imgur.com/1JCz8yg.png'}/>
                        <ChildReport childname='Eddie' icon={'https://i.imgur.com/1JCz8yg.png'}/>
                    </div>
                </div>
                
            </Fragment>
        )
    }
}

export default ParentDashboard
