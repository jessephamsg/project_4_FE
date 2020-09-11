//DEPENDENCIES
import React, { Component, Fragment } from 'react'

//COMMON COMPONENTS
import ChildReport from '../../common/components/Card/ChildReport';
import EditChildModal from '../../common/components/Modal/EditChildModal';
import NewChildModal from '../../common/components/Modal/NewChildModal';
import ParentProfileModal from '../../common/components/Modal/ParentProfileModal';
import AllGames from '../../common/components/AllGamesSection';

//INTERACTION LOGIGS
import {AuthService} from '../../../interactions/AuthService';
import ChildProfileInteractions from '../../../interactions/ManageChildrenProfile';

//STYLES
import './style_module.css'


class ParentDashboard extends Component {
    
    static contextType = AuthService

    state = {
        kidList :[],
        gameList: null,
        isAddModalOpen : false,
        isEditModalOpen :false,
        editedKid : {
            name : '',
            bDay : '',
            icon : '',
            maxScreenTime : 0,
            age : 0
        }, 
      }

    getAllChildByParentID = async (currentId) => {
        console.log(currentId)
        const result = await ChildProfileInteractions.getUser.getAllChildByParentID(currentId)
        console.log('line39',result)
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
    }

    addChild = async (payload) => {
        console.log(payload)
        await ChildProfileInteractions.createUser.createKid(payload);
        await this.getAllChildByParentID(payload.parentID) // map childlist data
        this.toggleAddModal()
    }

    componentDidMount = async () => {
        const currentId = ChildProfileInteractions.getUser.getCurrentLocalID();
        await this.getAllChildByParentID(currentId);
    }

    updateChild = async (editedChildData) => {
        await ChildProfileInteractions.updateUser.updateKid(editedChildData);
        const parentId = this.context.userId
        await this.getAllChildByParentID(parentId) // expensive operation. not advised. 
        this.toggleEditChildModal();
    }

    deleteChild = async (id) => {
        const kidId = id
        const parentId = this.context.userId
        await ChildProfileInteractions.deleteUser.deleteKid(kidId);
        await this.getAllChildByParentID(parentId)
    }

    render() {
        return (
            <Fragment>
                <EditChildModal
                    isModalOpen = {this.state.isEditModalOpen}
                    toggleModal = {this.toggleEditChildModal}
                    childData = {this.state.editedKid}
                    update = {this.updateChild}
                />
                <NewChildModal
                    isModalOpen = {this.state.isAddModalOpen}
                    toggleModal = {this.toggleAddModal}
                    submit = {this.addChild}
                    handleChange= {this.handleChange}
                    addChild = {this.addChild}
                />
                <div className='parentDashboard'>
                    <ParentProfileModal 
                        onClick={this.toggleAddModal} 
                        update = {this.state.kidList}
                    />
                    <div className='dashboard-main'>
                        <div className='childList-wrapper'>
                            <h3>Your children</h3>
                            <div className='childList-container'>
                                    {!this.state.kidList ? 
                                        <Fragment/> 
                                        : 
                                        <Fragment>
                                            {this.state.kidList.map((kid,index) => {
                                            return (
                                                <div>
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
                                                </div>
                                            )})}
                                        </Fragment>
                                    }
                                <div className='add-card'>
                                    <button id='addChildBtn' onClick={this.toggleAddModal}>Add</button>
                                </div>
                            </div>
                            <div className='gameList-wrapper'>
                                <h3>Our games</h3>
                                <div className='gameList_parent'>
                                    <AllGames/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default ParentDashboard
