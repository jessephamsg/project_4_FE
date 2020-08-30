import React, { Component, Fragment } from 'react'
import ChildReport from '../../common/components/Card/ChildReport'
import './style_module.css'
import ActionBtn from '../../common/elements/ActionBtn'
import {AuthService} from '../../../services/AuthService';
import api from '../../../api';
import local from '../../../storage/localStorage';
import Utility from '../../common/Utility';
import EditChildModal from '../../common/components/Modal/EditChildModal'
import NewChildModal from '../../common/components/Modal/NewChildModal'


class ParentDashboard extends Component {
    
    static contextType = AuthService
    state = {
        kidList :[],
        isAddModalOpen : false,
        isEditModalOpen :false,
        editedKid : {
            name : '',
            bDay : '',
            icon : '',
            maxScreenTime : 0,
            age : 0
        }
      }

    getAllChildByParentID = async () => {
        const currentId = local.get('currentId')
        const result = await api.getAllChildByParentID(currentId)
        this.setState ({
            kidList : result.data.data.length? result.data.data : null
        })
    }
    toggleEditChildModal = (index) => {
        const dummyKid = {
                name : '',
                bDay : '',
                icon : '',
                maxScreenTime : 0,
                age : 0
        }
        this.setState({
            editedKid : this.state.kidList[index] || dummyKid,
            isEditModalOpen : !this.state.isEditModalOpen
        })
    }
      
    toggleAddModal = () => {
        const altNewKid = {
            name : '',
            bDay : '',
            icon : '',
            maxScreenTime : 0,
            age : 0
        }
        this.setState({
            addKid : this.state.addKid || altNewKid,
            isAddModalOpen: !this.state.isAddModalOpen
        });
    }

    handleChange = e => {
        const newState = Object.assign(this.state.editedKid,{[e.target.name]: e.target.value})
        this.setState({
            editedKid : newState
        })
        console.log(this.state.editedKid)
    }

    addChild = async (payload) => {
        await api.createKid(payload) // create kid and add to kidlist
        await this.getAllChildByParentID() // map childlist data
        await this.toggleAddModal()
    }
    updateChild = async (e) => {
        e.preventDefault()
        const kidId = this.state.editedKid._id
        const payload = {
            name : this.state.editedKid.name,
            bDay : this.state.editedKid.bDay,
            age : Utility.calAge(this.state.editedKid.bDay),
            maxScreenTime : this.state.editedKid.maxScreenTime,
            icon : this.state.editedKid.icon,
            isPlaying : this.state.editedKid.isPlaying
        }
        await api.updateKid(payload, kidId)
        await this.getAllChildByParentID()
        await this.toggleEditChildModal()
    }
    deleteChild = async (id) => {
        await api.deleteKid(id)
        await this.getAllChildByParentID()
    }

    componentDidMount () {
        this.getAllChildByParentID()
    }


    render() {
        return (
            <Fragment>
                <EditChildModal
                    isModalOpen = {this.state.isEditModalOpen}
                    name = {this.state.editedKid.name}
                    bDay = { this.state.editedKid.bDay}
                    maxScreenTime = {this.state.editedKid.maxScreenTime}
                    icon = {this.state.editedKid.icon}
                    toggleModal = {this.toggleEditChildModal}
                    submit = {this.updateChild}
                    handleChange= {this.handleChange}
                    iconModal = {this.state.iconModal}
                    toggleIconModal = {this.toggleIconModal}
                />
                <NewChildModal
                    isModalOpen = {this.state.isAddModalOpen}
                    toggleModal = {this.toggleAddModal}
                    submit = {this.addChild}
                    handleChange= {this.handleChange}
                    iconModal = {this.state.iconModal}
                    toggleIconModal = {this.toggleIconModal}
                    addChild = {this.addChild}
                />

                <div className='parentDashboard'>
                    <h1>Hi {this.props.match.params.username}</h1>
                    <div className='main-container'>
                        <div className='left-container'>
                            <div>
                                <ActionBtn text='+' onClick={this.toggleAddModal} />
                                <h3>Add a child</h3>
                            </div>
                        </div>
                        <div className='right-container'>
                            {!this.state.kidList ? 
                                <h1>You have not enter a child yet</h1> :
                                this.state.kidList.map((kid,index) => {
                                return (
                                    <ChildReport 
                                        childname={kid.name} 
                                        icon={kid.icon} 
                                        key={kid._id} 
                                        id={kid._id} 
                                        data={kid}
                                        index= {index}
                                        toggleEditChildModal = {this.toggleEditChildModal}
                                        deleteChild = {this.deleteChild}
                                    />
                                )}
                            )}
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default ParentDashboard
