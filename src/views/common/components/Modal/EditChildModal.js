//DEPENDENCIES
import React, { Fragment ,useState, useEffect, Component} from 'react'

//COMMON ELEMENTS
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBInput, MDBInputGroup } from 'mdbreact';
import IconModal from './IconModal';


const iconSelector = {
    display: 'flex',
    flexFlow : 'row nowrap',
    justifyContent : 'flex-start',
    alignItems :'center'
}

export default function EditChildModal (props) {
    const [Icon, setIcon] = useState(props.icon) // props.icon not used here
    const [isIconModalOpen, setIsIconModalOpen] = useState(false)

    const toggleIconModal = () => {
        setIsIconModalOpen(!isIconModalOpen)

    }

    const addIcon = async icon => {
        setIcon(icon)
        console.log(icon)
        await toggleIconModal()
    }
    const handleChange = e => {
        e.preventDefault()
        props.handleChange(e)
    }
    
    return (
        <Fragment>
        <MDBContainer >
        <form onSubmit={props.submit}>
        <MDBModal isOpen={props.isModalOpen} toggle={props.toggleModal}>
            <MDBModalHeader toggle={props.toggleModal}>Edit</MDBModalHeader>
            <MDBModalBody className='editForm'>

                <MDBInput
                    required 
                    label="Your child's name"
                    name = "name"
                    type ="text" 
                    value={props.name}
                    onChange= {props.handleChange}
                />

                <MDBInput 
                    required
                    label="bDay"
                    hint ="bDay"
                    name ="bDay"
                    type ="date" 
                    value={props.bDay}
                    onChange= {props.handleChange}
                />

                <MDBInput 
                    required
                    label="Maximum screen Time in seconds"
                    name ="maxScreenTime"
                    type ="number" 
                    value={props.maxScreenTime}
                    onChange= {props.handleChange}
                />

                <MDBInput 
                    required
                    label='select an icon or a url image of your choice'
                    name ="icon"
                    type ="text" 
                    value={props.icon} // initial state did not rendered.
                    onChange= {props.handleChange}
                />

                <MDBBtn
                    className= 'px-2 mx-0'
                    color='primary' 
                    onClick={toggleIconModal}
                    > Select Icon
                </MDBBtn>

            </MDBModalBody>
            <MDBModalFooter>
            <MDBBtn color="primary" type="submit">Submit</MDBBtn>
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

