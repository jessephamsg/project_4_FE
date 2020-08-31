//DEPENDENCIES
import React, { Component, Fragment } from 'react'

//COMMON COMPONENTS
import ActionBtn from '../../common/elements/ActionBtn'
import Input from '../../common/elements/Input';
import { ModalInput } from '../../common/components/Modal';
import ChildReport from '../../common/components/Card/ChildReport'
import EditChildModal from '../../common/components/Modal/EditChildModal'
import NewChildModal from '../../common/components/Modal/NewChildModal'

//INTERACTION LOGIGS
import {AuthService} from '../../../interactions/AuthService';
import ChildProfileInteractions from '../../../interactions/ManageChildrenProfile'

//STYLES
import './style_module.css'


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

    getAllChildByParentID = async (currentId) => {
        const result = await ChildProfileInteractions.getUser.getAllChildByParentID(currentId)
        console.log(result.data.data.length)
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
        console.log(e.target.name)
        const newState = Object.assign(this.state.editedKid,{[e.target.name]: e.target.value})
        this.setState({
            editedKid : newState
        })
        console.log(this.state.editedKid)
    }

    addChild = async (payload) => {
        console.log(payload)
        await ChildProfileInteractions.createUser.createKid(payload);
        await this.getAllChildByParentID(payload.parentID) // map childlist data
        this.toggleAddModal()
    }

    componentDidMount () {
        const currentId = ChildProfileInteractions.getUser.getCurrentLocalID();
        this.getAllChildByParentID(currentId)
    }

    updateChild = async (e) => {
        e.preventDefault()
        const editedKid = this.state.editedKid;
        await ChildProfileInteractions.updateUser.updateKid(editedKid);
        this.toggleEditChildModal();
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
                                    />
                                )})
                            }
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default ParentDashboard
