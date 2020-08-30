import React, { Component, Fragment } from 'react'
import ChildCard from '../../common/components/Card/ChildCard'
import './style_module.css'
import local from '../../../storage/localStorage'
import api from '../../../api'


export class HomePage extends Component {
    
    state= {
        kidlist : null
    }

    getAllChildByParentID = async (currentId) => {
        const result = await api.getAllChildByParentID(currentId)
        this.setState ({
            kidList : result.data.data.length ? result.data.data : null
        })
        console.log(this.state.kidList)
    }

    componentDidMount () {
        const currentId = local.get('currentId')
        console.log(currentId)
        this.getAllChildByParentID(currentId)
    }
    
    render() {
        return (
            <Fragment>
                <div className='homepage'>
                    <h1>Hi friend, What is your name?</h1>
                    <div className='childList'>
                        {!this.state.kidList ? 
                        <h1>You have not enter a child yet</h1> 
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
