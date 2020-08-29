import React, { Fragment, Component } from 'react'
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBInput, MDBInputGroup } from 'mdbreact';
import Utility from '../../../common/Utility'
import api from '../../../../api'
import IconModal from './IconModal'
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
    toggleIconModal = () => {
        this.setState({
          isIconModalOpen: !this.state.isIconModalOpen
        });
    }
    addIcon = async icon => {
        console.log(icon)
        this.setState({icon : icon})
        await this.toggleIconModal()
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
    }

    render() {
    return (
        <Fragment>
        <MDBContainer >
        <form onSubmit={this.handleSubmit}>
        <MDBModal isOpen={this.props.isModalOpen} toggle={this.props.toggleModal}>
            <MDBModalHeader toggle={this.props.toggleModal}>choose an icon </MDBModalHeader>
            <MDBModalBody className='editForm'>

                <MDBInput
                    required 
                    label="Your child's name"
                    name = "name"
                    type ="text" 
                    value={this.state.name}
                    onChange= {this.handleChange}
                />

                <MDBInput 
                    required
                    label="bDay"
                    hint ="bDay"
                    name ="bDay"
                    type ="date" 
                    value={this.state.bDay}
                    onChange= {this.handleChange}
                />

                <MDBInput 
                    required
                    label="Maximum screen Time in seconds"
                    name ="maxScreenTime"
                    type ="number" 
                    value={this.state.maxScreenTime}
                    onChange= {this.handleChange}
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
                >
                </MDBInputGroup>

            </MDBModalBody>
            <MDBModalFooter>
            <MDBBtn color="primary" type="submit">Submit</MDBBtn>
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
