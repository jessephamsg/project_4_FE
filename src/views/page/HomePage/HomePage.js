//DEPENDENCIES
import React, { Component, Fragment } from 'react'

//COMMON COMPONENTS
import ChildCard from '../../common/components/Card/ChildCard'

//INTERACTION LOGICS
import ChildProfileInteractions from '../../../interactions/ManageChildrenProfile'

//STYLES
import './style_module.css'


export class HomePage extends Component {
    
    state= {
        kidlist : null
    }

    getAllChildByParentID = async (currentId) => {
        const result = await ChildProfileInteractions.getUser.getAllChildByParentID(currentId);
        this.setState ({
            kidList : result.data.data.length ? result.data.data : null
        })
        console.log(this.state.kidList)
    }

    // interp (i) {
    //     r => `translate3d(0, ${15 * Math.sin(r + (i * 2 * Math.PI) / 1.6)}px, 0)`
    // }

    // async springMovement (radians) {
    //     while (1) await this.springMovement({radians: 2 * Math.PI})
    // }

    componentDidMount () {
        const currentId = ChildProfileInteractions.getUser.getCurrentLocalID();
        console.log(currentId)
        this.getAllChildByParentID(currentId)
    }
    
    render() {
        return (
            <Fragment>
                <div className='homepage'>
                    <div className='childList'>
                        {!this.state.kidList ? 
                        <h1>You have not entered a child yet</h1> 
                        :
                        this.state.kidList.map((kid) => 
                            <ChildCard childname={kid.name} icon={kid.icon} key={kid._id} />
                        )}
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default HomePage
