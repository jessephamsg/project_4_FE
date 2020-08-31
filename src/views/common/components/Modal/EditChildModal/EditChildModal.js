import React, { Fragment ,useState, useEffect, Component} from 'react'
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBInput, MDBInputGroup } from 'mdbreact';
import IconModal from '../IconModal';
import './style_module.css'
import Input from '../../../elements/Input/Input';
import Button from '../../../elements/Buttons';

export default function EditChildModal (props) {
    const [Icon, setIcon] = useState(props.icon) // props.icon not used here
    const [isIconModalOpen, setIsIconModalOpen] = useState(false)

    const toggleIconModal = (e) => {
        e.preventDefault()
        setIsIconModalOpen(!isIconModalOpen)

    }

    const addIcon = async icon => {
        setIcon(icon)
        console.log(icon)
        await setIsIconModalOpen(!isIconModalOpen)
    }
    const handleChange = e => {
        props.handleChange(e)
    }
    
    
    return (
        <Fragment>
        <MDBContainer className='editForm'>
        <form onSubmit={props.submit}>
        <MDBModal isOpen={props.isModalOpen} toggle={props.toggleModal}>
            <MDBModalHeader toggle={props.toggleModal}>Edit</MDBModalHeader>
            <MDBModalBody >
                <Input 
                    required = {true}
                    placeholder ="Your child's name"
                    name ="name"
                    type ="text" 
                    value={props.name}
                    onChange= {props.handleChange}
                />

                <div className='dobInput'>
                    <label htmlFor='bDay' className='dob'>DOB</label>
                    <Input 
                        required = {true}
                        name ="bDay"
                        type ="date" 
                        value={props.bDay}
                        onChange= {props.handleChange}
                    />
                </div>
                <Input 
                    required = {true}
                    placeholder ="Maximum screen Time in minutes"
                    name ="maxScreenTime"
                    type ="number" 
                    value={props.maxScreenTime}
                    onChange= {props.handleChange}
                />
                <div className='iconInput'>
                    <Input 
                        required = {true}
                        placeholder ="select an icon or a url image of your choice" 
                        name ="icon"
                        type ="text" 
                        value={props.icon} // initial state did not rendered if put Icon.
                        onChange= {props.handleChange}
                    />
                    <Button id='iconBtn' onClick={toggleIconModal} text ='Icon'/>
                </div>
            </MDBModalBody>
            <MDBModalFooter className='editModalFooter'>
                <Button type="submit" text='submit' id="editBtn"/>
            </MDBModalFooter>
        </MDBModal>
        </form>
    </MDBContainer>
    <IconModal 
        isIconModalOpen = {isIconModalOpen}
        toggleIconModal = {toggleIconModal}
        addIcon = {addIcon}
        handleChange = {handleChange}
    />
    </Fragment>
    )
}