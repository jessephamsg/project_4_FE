//DEPENDENCIES
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

//COMMON ELEMENTS
import Button from '../../../elements/Buttons'

//STYLES
import './style_module.css'


export class ChildReport extends Component {

    handleDeleteChild = (e) => {
        e.preventDefault()
        console.log(this.props.id)
        let res = window.confirm(`Are you sure you want to remove?${this.props.childname}`)
        if(res) {
            this.props.deleteChild(this.props.id)
        } else {
            return
        }
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
                                alt={this.props.childname+ "icon"}
                                title={this.props.childname + "icon"} 
                                className='childIcon'
                            />
                            <h1> {this.props.childname}</h1>
                            <p>Last played at :</p>
                            <p>ScreenTime : {this.props.data.maxScreenTime} minutes</p>
                        </div>
                        <div className="flip-card-back">
                            <div>
                                <h1>{this.props.childname}</h1> 
                                <h1>Age : {this.props.data.age}</h1> 
                            </div>
                            <div className ='actionFooter'>
                                <Button text='Edit' onClick={this.toggleEditChildModal} className='actionBtn' />
                                <Button text='Del' onClick={this.handleDeleteChild} className='actionBtn' />
                                <Button text='See' onClick={this.directToChildReportPage} className='actionBtn' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(ChildReport)
