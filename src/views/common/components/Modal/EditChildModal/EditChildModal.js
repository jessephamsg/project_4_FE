//DEPENDENCIES
<<<<<<< HEAD
import React, { Fragment ,useState} from 'react'

//COMMON COMPONENTS
import { MDBContainer, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import IconModal from '../IconModal';
import Input from '../../../elements/Input/Input';
import Button from '../../../elements/Buttons';
=======
import React, { Fragment ,useState, useEffect} from 'react'

//COMMON ELEMENTS
import { MDBContainer, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBInput, MDBInputGroup } from 'mdbreact';
import IconModal from '../IconModal';
import Button from '../../../elements/Buttons';
import Input from '../../../elements/Input/Input';
>>>>>>> 5c8b6898ebd30a43ee2786681f80a819318c5276

//STYLES
import './style_module.css'


export default function EditChildModal (props) {
<<<<<<< HEAD

    const [Icon, setIcon] = useState(props.icon) // props.icon not used here
    const [isIconModalOpen, setIsIconModalOpen] = useState(false)
=======
    const [Icon, setIcon] = useState('') // connot use props to set initial state
    const [isIconModalOpen, setIsIconModalOpen] = useState(false)
    const [childData, setChildData] = useState({})
>>>>>>> 5c8b6898ebd30a43ee2786681f80a819318c5276

    const toggleIconModal = (e) => {
        e.preventDefault()
        setIsIconModalOpen(!isIconModalOpen)
    }
<<<<<<< HEAD

    const addIcon = async icon => {
        setIcon(icon)
        console.log(icon)
        setIsIconModalOpen(!isIconModalOpen)
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
=======
    useEffect(() => {
        setChildData(props.childData)
    },[props.isModalOpen])

    const addIcon = async icon => {
        setIcon(icon)
        setIsIconModalOpen(!isIconModalOpen)
    }
    const handleChange = e => {
        setChildData({...childData,[e.target.name]:e.target.value})
    }
    const submit = (e) => {
        e.preventDefault()
        props.update(childData)
    }

    return (
        <Fragment>
        <MDBContainer >
        <form onSubmit={submit}>
        <MDBModal isOpen={props.isModalOpen} toggle={props.toggleModal}>
            <MDBModalHeader toggle={props.toggleModal}>Edit</MDBModalHeader>
            <MDBModalBody className='editForm'>
>>>>>>> 5c8b6898ebd30a43ee2786681f80a819318c5276
                <Input 
                    required = {true}
                    placeholder ="Your child's name"
                    name ="name"
                    type ="text" 
<<<<<<< HEAD
                    value={props.name}
                    onChange= {props.handleChange}
=======
                    value={childData.name}
                    onChange= {handleChange}
>>>>>>> 5c8b6898ebd30a43ee2786681f80a819318c5276
                />

                <div className='dobInput'>
                    <label htmlFor='bDay' className='dob'>DOB</label>
                    <Input 
                        required = {true}
                        name ="bDay"
                        type ="date" 
<<<<<<< HEAD
                        value={props.bDay}
                        onChange= {props.handleChange}
                    />
                </div>
=======
                        value={childData.bDay}
                        onChange= {handleChange}
                    />
                </div>

>>>>>>> 5c8b6898ebd30a43ee2786681f80a819318c5276
                <Input 
                    required = {true}
                    placeholder ="Maximum screen Time in minutes"
                    name ="maxScreenTime"
                    type ="number" 
<<<<<<< HEAD
                    value={props.maxScreenTime}
                    onChange= {props.handleChange}
                />
=======
                    value={childData.maxScreenTime}
                    onChange= {handleChange}
                />

>>>>>>> 5c8b6898ebd30a43ee2786681f80a819318c5276
                <div className='iconInput'>
                    <Input 
                        required = {true}
                        placeholder ="select an icon or a url image of your choice" 
                        name ="icon"
                        type ="text" 
<<<<<<< HEAD
                        value={props.icon} // initial state did not rendered if put Icon.
                        onChange= {props.handleChange}
                    />
                    <Button id='iconBtn' onClick={toggleIconModal} text ='Icon'/>
                </div>
            </MDBModalBody>
            <MDBModalFooter className='editModalFooter'>
                <Button type="submit" text='submit' id="editBtn"/>
=======
                        value={childData.icon}
                        onChange= {handleChange}
                    />
                    <Button id='iconBtn' onClick={toggleIconModal} text ='Icon'/>
                </div>

            </MDBModalBody>
            <MDBModalFooter>
            <Button type="submit" text='Update' id="editBtn"/>
>>>>>>> 5c8b6898ebd30a43ee2786681f80a819318c5276
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
<<<<<<< HEAD
}
=======
}

>>>>>>> 5c8b6898ebd30a43ee2786681f80a819318c5276
