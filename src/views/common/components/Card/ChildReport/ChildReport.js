import React, { Component } from 'react'
import './style_module.css'
import ActionBtn from '../../../elements/ActionBtn'
import { withRouter } from 'react-router-dom'
import avatar from '../../../assets/avatar'
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBInput, MDBInputGroup } from 'mdbreact';
import Utility from '../../../Utility'
import api from '../../../../../api'

export class ChildReport extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             editModal : false,
             iconModal : false
        }
    }
    
    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    toggleIconModal = () => {
        this.setState({
          iconModal: !this.state.iconModal
        });
    }
    addIcon = async e => {
        e.preventDefault()
        await this.toggleIconModal()
    }
    updateChild = async e =>  {
        e.preventDefault()
        const kidId = this.props.id
        const payload = {
            name : this.state.name,
            bDay : this.state.bDay,
            age : Utility.calAge(this.state.bDay),
            maxScreenTime : this.state.maxScreenTime,
            icon : this.state.icon,
            isPlaying : this.props.data.isPlaying
        }
        const updateKid = await api.updateKid(payload, kidId)
        if(!updateKid) {
            alert('something went wrong in updating')
        }
        await this.mapKidData(kidId)
        await this.toggleEdit()
    }
    toggleEdit = () => {
        this.setState({editModal: !this.state.editModal})
    }
    // componentDidUpdate(prevProps,prevState) {
    //     if(prevState.editModal !== this.state.editModal) {
    //         console.log(this.state.editModal)
    //         console.log(prevState.editModal)
    //         this.mapKidData(this.props.id)
    //         console.log('component didupdate')
    //     } else return
    // }

    componentDidMount() {
        this.setState({
            editModal : false,
            iconModal : false,
            name : this.props.data.name,
            bDay : this.props.data.bDay,
            icon : this.props.data.icon,
            age : this.props.data.age,
            maxScreenTime : this.props.data.maxScreenTime
        })
        console.log('component mounted', this.state)
    }

    mapKidData = async (kidId) => {
        const result = await api.getOneKid(kidId)
        const getKid = result.data.data
        await this.setState({
            name : getKid.name,
            bDay : getKid.bDay,
            icon : getKid.icon,
            age : getKid.age,
            maxScreenTime : getKid.maxScreenTime
        })
        console.log(getKid)
        console.log('this.state', this.state)
    }
    handleUpdate

    deleteChild = () => {
        alert('deleting')
    }
    directToChildReportPage = () => {
        this.props.history.push(`/child/${this.props.childname}/report`)
    }

    render() {
        return (
            <div className='childReport'>                
                <div className="flip-card">
                    <div className="flip-card-inner">
                        <div className="flip-card-front">
                            <img 
                                src={this.state.icon} 
                                alt={`${this.state.name}` + "icon"}
                                title={`${this.state.name}` + "icon"} 
                                className='childIcon'
                            />
                            <h1> {this.state.name}</h1>
                            <p>Last played at :</p>
                        </div>
                    <div className="flip-card-back">
                        <div>
                            <h1>{this.state.name}</h1> 
                            <h1>Age : {this.state.age}</h1> 
                        </div>
                        <div className ='action'>
                            <ActionBtn text='Edit' onClick={this.toggleEdit}/>
                            <ActionBtn text='Del' onClick={this.deleteChild}/>
                            <ActionBtn text='See' onClick={this.directToChildReportPage} />
                        </div>
                    </div>
                </div>
                </div>
{/* edit modal */}
                <MDBContainer >
                    <form onSubmit={this.updateChild}>
                    <MDBModal isOpen={this.state.editModal} toggle={this.toggleEdit}>
                        <MDBModalHeader toggle={this.toggleEdit}>choose an icon </MDBModalHeader>
                        <MDBModalBody className='editForm'>

                            <MDBInput
                                required 
                                label="Your child's name"
                                name = "name"
                                type ="text" 
                                value={this.state.name}
                                onChange={this.handleChange}
                            />

                            <MDBInput 
                                required
                                label="bDay"
                                hint ="bDay"
                                name ="bDay"
                                type ="date" 
                                value={this.state.bDay}
                                onChange={this.handleChange}
                            />

                            <MDBInput 
                                required
                                label="Maximum screen Time in seconds"
                                name ="maxScreenTime"
                                type ="number" 
                                value={this.state.maxScreenTime}
                                onChange={this.handleChange}
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
                                onChange={this.handleChange}
                            >
                            </MDBInputGroup>

                        </MDBModalBody>
                        <MDBModalFooter>
                        <MDBBtn color="primary" type="submit">Update</MDBBtn>
                        </MDBModalFooter>
                    </MDBModal>
                    </form>
                </MDBContainer>
{/* editIcon modal */}
                <MDBContainer>
                    <form onSubmit={this.addIcon}>
                    <MDBModal isOpen={this.state.iconModal} toggle={this.toggleIconModal}>
                        <MDBModalHeader toggle={this.toggleIconModal}>choose an icon </MDBModalHeader>
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
                                            onClick={this.handleChange}
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
                
            </div>
        )
    }
}
export default withRouter(ChildReport)
