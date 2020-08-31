//DEPENDENCIES
import React, { Fragment ,useState} from 'react'

//COMMON COMPONENTS
import { MDBContainer, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter} from 'mdbreact';
import Input from '../../../elements/Input/Input';
import Button from '../../../elements/Buttons';

//INTERACTION LOGICS
import ChildProfileInteractions from '../../../../../interactions/ManageChildrenProfile';
import LoggingInteractions from '../../../../../interactions/Logging';

//STYLES
import './style_module.css'


export default function AuthorizeModal (props) {

    const [password, setpassword] = useState('')
    const [error, setError] = useState(false)

    const handleChange = (e) => {
        setpassword(e.target.value)
    }

    const checkPassword = async () => {
        const parentId = ChildProfileInteractions.getUser.getCurrentLocalID()
        const payload = { password: password}
        const check = await LoggingInteractions.Logging.checkPassword(payload, parentId);
        const result = check.data.data
        if (!result) {
            setError(!error)
            return false
        } else return result 
    }

    const handleSubmit = async e => {
        e.preventDefault()
        const result = await checkPassword()
        props.checkSuccess(result)
    }

    return (
        <Fragment>
        <MDBContainer className='authorizeForm'>
        <form onSubmit={handleSubmit}>
        <MDBModal isOpen={props.isAuthorizeModalOpen} toggle={props.toggleAuthorizeModal}>
            <MDBModalHeader toggle={props.toggleAuthorizeModal}>Enter Password</MDBModalHeader>
            <MDBModalBody >
                <Input 
                    required = {true}
                    placeholder ="password"
                    name ="password"
                    type ="password" 
                    value={password}
                    onChange= {handleChange}
                />
            </MDBModalBody>
            <MDBModalFooter className='editModalFooter'>
                <Button type="submit" text='submit' id="editBtn"/>
            </MDBModalFooter>
        </MDBModal>
        </form>
    </MDBContainer>
    </Fragment>
    )
} 