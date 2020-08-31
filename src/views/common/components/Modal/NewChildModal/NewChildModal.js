import React, { Fragment, Component } from 'react'
import { MDBContainer,MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import Utility from '../../../Utility'
import api from '../../../../../api'
import IconModal from '../IconModal'
import Input from '../../../elements/Input/Input';
import Button from '../../../elements/Buttons';
import './style_module.css'
export default class NewChildModal extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            name : '',
            bDay : '',
            maxScreenTime : '',
            icon : '',
            isIconModalOpen : false,
        }
    }
    toggleIconModal = (e) => {
        e.preventDefault()
        this.setState({
          isIconModalOpen: !this.state.isIconModalOpen
        });
    }
    addIcon = async icon => {
        this.setState({icon : icon})
        await this.setState({
            isIconModalOpen: !this.state.isIconModalOpen
          });
    }


    handleChange = e => {
        console.log(e.target)
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = async e => {
        e.preventDefault()
        const currentUser = await api.getAuthUser()
        const parentID = currentUser.data.data._id 
        const payload = {
            parentID : parentID,
            name : this.state.name,
            bDay : this.state.bDay,
            age : Utility.calAge(this.state.bDay),
            maxScreenTime : this.state.maxScreenTime,
            icon : this.state.icon,
        }
        this.props.addChild(payload)
        this.props.toggleModal()
    }

    render() {
    return (
        <Fragment>
        <MDBContainer className='addForm' >
        <form onSubmit={this.handleSubmit}>
        <MDBModal isOpen={this.props.isModalOpen} toggle={this.props.toggleModal}>
            <MDBModalHeader toggle={this.props.toggleModal}>choose an icon </MDBModalHeader>
            <MDBModalBody >
                <Input 
                    required = {true}
                    placeholder ="Your child's name"
                    name ="name"
                    type ="text" 
                    value={this.state.name}
                    onChange= {this.handleChange}
                />

                <div className='dobInput'>
                    <label htmlFor='bDay' className='dob'>DOB</label>
                    <Input 
                        required = {true}
                        name ="bDay"
                        type ="date" 
                        value={this.state.bDay}
                        onChange= {this.handleChange}
                    />
                </div>
                <Input 
                    required = {true}
                    placeholder ="Maximum screen Time in minutes"
                    name ="maxScreenTime"
                    type ="number" 
                    value={this.state.maxScreenTime}
                    onChange= {this.handleChange}
                />
                <div className='iconInput'>
                    <Input 
                        required = {true}
                        placeholder ="select an icon or a url image of your choice" 
                        name ="icon"
                        type ="text" 
                        value={this.state.icon}
                        onChange= {this.handleChange}
                    />
                    <Button id='iconBtn' onClick={this.toggleIconModal} text ='Icon'/>
                </div>

            </MDBModalBody>
            <MDBModalFooter className='addModalFooter'>
                <Button type="submit" text='Add' id="addBtn"/>
            </MDBModalFooter>
        </MDBModal>
        </form>
    </MDBContainer>

    <IconModal 
        isIconModalOpen = {this.state.isIconModalOpen}
        toggleIconModal = {this.toggleIconModal}
        addIcon = {this.addIcon}
        handleChange = {this.handleChange}
    />
    
    </Fragment>
    )
    }
}
