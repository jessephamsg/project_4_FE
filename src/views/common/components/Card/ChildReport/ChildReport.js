//DEPENDENCIES
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

//COMMON ELEMENTS
import ActionBtn from '../../../elements/ActionBtn'

//STYLES
import './style_module.css'


export class ChildReport extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             editModal : false,
             iconModal : false,
             isEditModalOpen : false
        }
    }
    
    handleChange = event => {
        console.log('changing')
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

    deleteChild = () => {
        alert('deleting')
    }
    directToChildReportPage = () => {
        this.props.history.push(`/child/${this.props.childname}/report`)
    }
    toggleEditChildModal = () => {
        this.props.toggleEditChildModal(this.props.index)
    }

    render() {
        return (
            <div className='childReport'>                
                <div className="flip-card">
                    <div className="flip-card-inner">
                        <div className="flip-card-front">
                            <img 
                                src={this.props.icon} 
                                alt={`${this.props.childname}` + "icon"}
                                title={`${this.props.childname}` + "icon"} 
                                className='childIcon'
                            />
                            <h1> {this.props.childname}</h1>
                            <p>Last played at :</p>
                        </div>
                        <div className="flip-card-back">
                            <div>
                                <h1>{this.props.childname}</h1> 
                                <h1>Age : {this.props.data.age}</h1> 
                            </div>
                            <div className ='action'>
                                <ActionBtn text='Edit' onClick={this.toggleEditChildModal}/>
                                <ActionBtn text='Del' onClick={this.deleteChild}/>
                                <ActionBtn text='See' onClick={this.directToChildReportPage} />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
export default withRouter(ChildReport)
