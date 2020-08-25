import React, { Component, Fragment} from 'react'
import ChildReport from '../../common/components/Card/ChildReport'
import './style_module.css'
import ActionBtn from '../../common/elements/ActionBtn'

export class ParentDashboard extends Component {

    render() {

        return (
            <Fragment>
                <div className='parentDashboard'>
                    <h1>Hi {this.props.match.params.parent}, here are the list of all your children</h1>
                    <div className='main-container'>
                        <div className = 'left-container'>
                            <div>
                                <ActionBtn text='+'/>
                                <h3>Add a child</h3>
                            </div>
                        </div>
                        <div className='right-container'>
                            <ChildReport childname='Matty' icon={'https://i.imgur.com/1JCz8yg.png'}/>
                            <ChildReport childname='Patty' icon={'https://i.imgur.com/1JCz8yg.png'}/>
                            <ChildReport childname='Stacy' icon={'https://i.imgur.com/1JCz8yg.png'}/>
                            <ChildReport childname='Brandy' icon={'https://i.imgur.com/1JCz8yg.png'}/>
                            <ChildReport childname='Freddy' icon={'https://i.imgur.com/1JCz8yg.png'}/>
                            <ChildReport childname='Eddie' icon={'https://i.imgur.com/1JCz8yg.png'}/>
                        </div>
                    </div>
                </div>
                
            </Fragment>
        )
    }
}

export default ParentDashboard
