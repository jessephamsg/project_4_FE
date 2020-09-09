//DEPENDENCIES
import React, { Component } from 'react';

//COMMON ELEMENTS
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import Input from '../../elements/Input';


export class Modal extends Component {
    
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <MDBContainer>
            <MDBModal isOpen={this.props.isOpen} toggle={this.props.toggle}>
                <MDBModalHeader toggle={this.props.toggle}>{this.props.text}</MDBModalHeader>
                <MDBModalBody>
                    {this.props.children}
                </MDBModalBody>
                <MDBModalFooter>
                    <MDBBtn color="secondary" onClick={this.props.toggle}>Close</MDBBtn>
                    <MDBBtn color="primary">Save changes</MDBBtn>
                </MDBModalFooter>
            </MDBModal>
            </MDBContainer>
        )
    }
}

export default Modal
