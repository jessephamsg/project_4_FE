//DEPENDENCIES
import React, { Fragment, Component } from 'react';

//COMMON ELEMENTS
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBInput, MDBInputGroup } from 'mdbreact';
import IconModal from '../IconModal'
import Input from '../../../elements/Input/Input';
import Button from '../../../elements/Buttons';

//INTERACTION LOGICS
import childProfileInteractions from '../../../../../interactions/ManageChildrenProfile';

//STYLES
import './style_module.css';


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
        const {name, bDay, maxScreenTime, icon} = this.state;
        const payload = await childProfileInteractions.getUser.buildChildPayload(name, bDay, maxScreenTime, icon)
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
