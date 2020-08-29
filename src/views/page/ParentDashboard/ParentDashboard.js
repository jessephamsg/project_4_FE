import React, { Component, Fragment } from 'react'
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBInput, MDBInputGroup } from 'mdbreact';
import ChildReport from '../../common/components/Card/ChildReport'
import './style_module.css'
import ActionBtn from '../../common/elements/ActionBtn'
import { ModalInput } from '../../common/components/Modal';
import Input from '../../common/elements/Input';
import {AuthService} from '../../../services/AuthService';
import api from '../../../api';
import avatar from '../../common/assets/avatar'
import local from '../../../storage/localStorage';


const calAge = (input) => {
    // input date is in "YYYY-MM-DD"
    const splitDate = input.split("-")
    const userDate = new Date(splitDate[0],splitDate[1],splitDate[2])
    const today = new Date()
    const age = Math.round((Math.abs(today.getTime() - userDate.getTime()) / (1000 * 3600 * 24 * 365.25)))
    return age

}

class ParentDashboard extends Component {
    
    static contextType = AuthService
    state = {
        modal: false,
        iconModal : false
      }

    getAllChildByParentID = async (currentId) => {
        console.log('getting')
        const result = await api.getAllChildByParentID(currentId)
        console.log(result.data.data)
        this.setState ({
            kidList : result.data.data.length? result.data.data : null
        })
        console.log(this.state.kidList)
    }
      
    toggleAddModal = () => {
        this.setState({
          modal: !this.state.modal
        });
    }

    toggleIconModal = () => {
        this.setState({
          iconModal: !this.state.iconModal
        });
    }
    addIcon = async e => {
        e.preventDefault()
        await this.toggleIconModal()
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    addChild = async e => {
        e.preventDefault()
        const currentUser = await api.getAuthUser()
        const parentID = currentUser.data.data._id
        const payload = {
            parentID : parentID,
            name : this.state.kidName,
            bDay : this.state.bDay,
            age : calAge(this.state.bDay),
            maxScreenTime : 10,
            icon : this.state.icon,
        }
        console.log(payload)
        const createKid = await api.createKid(payload) // create kid and add to kidlist
        if (!createKid){alert('something went wrong with creation', createKid)}
        await this.getAllChildByParentID(parentID) // map childlist data
        await this.toggleAddModal()
    }
    componentDidMount () {
        const currentId = local.get('currentId')
        console.log(currentId)
        this.getAllChildByParentID(currentId)
    }
    


    render() {
        return (
            <Fragment>
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
                                this.state.kidList.map(kid => {
                                return <ChildReport childname={kid.name} icon={kid.icon} key={kid._id} data={kid} />
                                })
                            }
                        </div>
                    </div>
                </div>
                <MDBContainer>
                    <form onSubmit={this.addChild}>
                    <MDBModal isOpen={this.state.modal} toggle={this.toggleAddModal}>
                        <MDBModalHeader toggle={this.toggleAddModal}>MDBModal title</MDBModalHeader>
                        <MDBModalBody>
                            <MDBInput
                                required 
                                label="Your child's name"
                                name = "kidName"
                                type ="text" 
                                value={this.state.kidname}
                                onChange={this.handleChange}
                            />

                            <MDBInput 
                                required
                                label="bDay"
                                hint ="bDay"
                                name ="bDay"
                                type ="date" 
                                value={this.state.bDay}
                                onChange={this.handleChange}
                            />

                            <MDBInputGroup
                                material
                                containerClassName='mb-3 mt-0'
                                prepend={
                                    <MDBBtn
                                    className= 'px-2 mx-0'
                                    color='primary' 
                                    onClick={this.toggleIconModal}
                                    > Select Icon
                                    </MDBBtn>
                                }
                                required
                                hint ="select an icon or a url image of your choice"
                                name ="icon"
                                type ="text" 
                                value={this.state.icon}
                                onChange={this.handleChange}
                            >
                            </MDBInputGroup>

                        </MDBModalBody>
                        <MDBModalFooter>
                        <MDBBtn color="secondary" onClick={this.toggleAddModal}>Close</MDBBtn>
                        <MDBBtn color="primary" type="submit">Add child</MDBBtn>
                        </MDBModalFooter>
                    </MDBModal>
                    </form>
                </MDBContainer>

                <MDBContainer>
                    <form onSubmit={this.addIcon}>
                    <MDBModal isOpen={this.state.iconModal} toggle={this.toggleIconModal}>
                        <MDBModalHeader toggle={this.toggleIconModal}>choose an icon </MDBModalHeader>
                        <MDBModalBody className='iconSelection'>

                            {Object.keys(avatar).map((key,index) => {
                                return <div className='icon' key={index}>
                                        <label htmlFor= {key}>
                                            <img src={avatar[key]}
                                                alt={key} 
                                                title={key}
                                                className='iconImg'
                                                />
                                        </label>
                                        <input 
                                            type= 'radio' 
                                            id={key} 
                                            name='icon' 
                                            value={avatar[key]} 
                                            onClick={this.handleChange}
                                        />
                                    </div>
                                })
                            }

                        </MDBModalBody>
                        <MDBModalFooter>
                        <MDBBtn color="secondary" onClick={this.toggleIconModal}>Close</MDBBtn>
                        <MDBBtn color="primary" type="submit">Add Icon</MDBBtn>
                        </MDBModalFooter>
                    </MDBModal>
                    </form>
                </MDBContainer>


            </Fragment>
        )
    }
}

export default ParentDashboard
