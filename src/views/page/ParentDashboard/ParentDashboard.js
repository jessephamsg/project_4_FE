import React, { Component, Fragment } from 'react'
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBInput, MDBInputGroup } from 'mdbreact';
import ChildReport from '../../common/components/Card/ChildReport'
import './style_module.css'
import ActionBtn from '../../common/elements/ActionBtn'
import { ModalInput } from '../../common/components/Modal';
import Input from '../../common/elements/Input';
import {AuthContext} from '../../../AuthContext';
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
    static contextType = AuthContext
    state = {
        modal: false,
        iconModal : false
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
            kidName : this.state.kidName,
            kidBDay : this.state.kidBDay,
            kidAge : calAge(this.state.kidBDay),
            kidMaxScreenTime : 10,
            kidIcon : this.state.kidIcon,
        }
        const createKid = await api.createKid(payload) // create kid and add to kidlist
        
        if (createKid) {
        await this.toggleAddModal()
        } else {
            alert('something went wrong with creation', createKid)
        }
    }
    componentDidMount () {
        const getAllParent = async (currentId) => {
            const result = await api.getParentById(currentId)
            this.setState ({
                parentData : result.data.data,
                kidList : result.data.data.kidsList
            })
            console.log(this.state.kidList[0])
        }
        const currentId = local.get('currentID')
        console.log(currentId)
        getAllParent(currentId)
    }

    


    render() {
        return (
            <Fragment>
                <div className='parentDashboard'>
                    <h1>Hi {this.props.match.params.parent}, here are the list of all your children</h1>
                    <div className='main-container'>
                        <div className='left-container'>
                            <div>
                                <ActionBtn text='+' onClick={this.toggleAddModal} />
                                <h3>Add a child</h3>
                            </div>
                        </div>
                        <div className='right-container'>
                            {!this.state.kidList ? <h1>loading</h1> :
                            this.state.kidList.map((kid) => 
                                <ChildReport childname={kid.kidName} icon={kid.kidIcon} key={kid.kidID} />
                            )}
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
                                label="DOB"
                                hint ="DOB"
                                name ="kidBDay"
                                type ="date" 
                                value={this.state.kidBDay}
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
                                name ="kidIcon"
                                type ="text" 
                                value={this.state.kidIcon}
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
                                            name='kidIcon' 
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
