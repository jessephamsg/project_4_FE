//DEPENDENCIES
import React, { Fragment ,useState, useEffect} from 'react'

//COMMON ELEMENTS
import { MDBContainer, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBInput, MDBInputGroup } from 'mdbreact';
import IconModal from '../IconModal';
import Button from '../../../elements/Buttons';
import Input from '../../../elements/Input/Input';

//STYLES
import './style_module.css'


export default function EditChildModal (props) {
    const [Icon, setIcon] = useState('') // connot use props to set initial state
    const [isIconModalOpen, setIsIconModalOpen] = useState(false)
    const [childData, setChildData] = useState({})

    const toggleIconModal = (e) => {
        e.preventDefault()
        setIsIconModalOpen(!isIconModalOpen)
    }
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
                <Input 
                    required = {true}
                    placeholder ="Your child's name"
                    name ="name"
                    type ="text" 
                    value={childData.name}
                    onChange= {handleChange}
                />

                <div className='dobInput'>
                    <label htmlFor='bDay' className='dob'>DOB</label>
                    <Input 
                        required = {true}
                        name ="bDay"
                        type ="date" 
                        value={childData.bDay}
                        onChange= {handleChange}
                    />
                </div>

                <Input 
                    required = {true}
                    placeholder ="Maximum screen Time in minutes"
                    name ="maxScreenTime"
                    type ="number" 
                    value={childData.maxScreenTime}
                    onChange= {handleChange}
                />

                <div className='iconInput'>
                    <Input 
                        required = {true}
                        placeholder ="select an icon or a url image of your choice" 
                        name ="icon"
                        type ="text" 
                        value={childData.icon}
                        onChange= {handleChange}
                    />
                    <Button id='iconBtn' onClick={toggleIconModal} text ='Icon'/>
                </div>

            </MDBModalBody>
            <MDBModalFooter>
            <Button type="submit" text='Update' id="editBtn"/>
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

