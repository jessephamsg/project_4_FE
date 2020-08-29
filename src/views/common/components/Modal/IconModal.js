import React ,{useState} from 'react'
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBInput, MDBInputGroup } from 'mdbreact';
import avatar from '../../assets/avatar'


export default function IconModal (props) {
    const [icon, setIcon] = useState('')

    const handleChange = e => {
        setIcon(e.target.value)
        props.handleChange(e)
        console.log(icon)
    }
    const handleSubmit = e => {
        console.log(icon)
        e.preventDefault()
        props.addIcon(icon)
    }
    return (
    <MDBContainer>
        <form onSubmit={handleSubmit}>
        <MDBModal isOpen={props.isIconModalOpen} toggle={props.toggleIconModal}>
            <MDBModalHeader toggle={props.toggleIconModal}>choose an icon </MDBModalHeader>
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
                                name='icon' 
                                value={avatar[key]} 
                                // onClick={props.handleChange}
                                onClick={handleChange}
                            />
                        </div>
                    })
                }
            </MDBModalBody>
            <MDBModalFooter>
            <MDBBtn color="primary" type="submit">Choose</MDBBtn>
            </MDBModalFooter>
        </MDBModal>
        </form>
    </MDBContainer>
    )
}