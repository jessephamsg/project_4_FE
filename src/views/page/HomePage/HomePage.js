import React, { Component, Fragment } from 'react'
import ChildCard from '../../common/components/Card/ChildCard'
import './style_module.css'
import local from '../../../storage/localStorage'
import api from '../../../api'


export class HomePage extends Component {
    state={
        kidlist : null
    }


    getAllParent = async (currentId) => {
        const result = await api.getParentById(currentId)
        this.setState ({
            parentData : result.data.data,
            kidList : result.data.data.kidsList
        })
        console.log(this.state.kidList[0])
    }

    componentDidMount () {
        const currentId = local.get('currentId')
        console.log(currentId)
        this.getAllParent(currentId)
    }
    


    render() {
        return (
            <Fragment>
                <div className='homepage'>
                    <h1>Hi friend, What is your name?</h1>
                    <div className='childList'>
                        {!this.state.kidList ? <h1>You have not enter a child yet</h1> :
                            this.state.kidList.map((kid) => 
                                <ChildCard childname={kid.kidName} icon={kid.kidIcon} key={kid.kidID} />
                            )}
                    </div>
                </div>
                
            </Fragment>
        )
    }
}

export default HomePage
