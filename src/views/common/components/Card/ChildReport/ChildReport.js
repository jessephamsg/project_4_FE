import React, { Component } from 'react'
import './style_module.css'
import ActionBtn from '../../../elements/ActionBtn'

export class ChildReport extends Component {

    editChild () {
        alert('editing')
    }

    deleteChild () {
        alert('deleting')
    }

    render() {
        console.log(this.props.data)
        return (
            <div className='ChildReport'>
                {/* <a href= {`/child/${this.props.childname}/report`}>
                <div className='icon_container'>
                    <img className='childIcon' src={this.props.icon} alt= 'childname' title='childname'/>
                </div>
                    <h2> {this.props.childname} statistic use flipcard </h2>
                </a> */}
                
                <div class="flip-card">
                    <div class="flip-card-inner">
                        <div class="flip-card-front">
                            <img 
                                src={this.props.icon} 
                                alt={`${this.props.childname}` + "icon"}
                                title={`${this.props.childname}` + "icon"} 
                                className='childIcon' 
                                style={{width:"300px" , height:"300px"}}/>
                        </div>
                    <div class="flip-card-back">
                        <h1>{this.props.childname}</h1> 
                        <p>Architect Engineer</p> 
                        <p>We love that guy</p>
                        <ActionBtn text='Edit' onClick={this.editChild}/>
                        <ActionBtn text='Graduate' onClick={this.deleteChild}/>
                        <ActionBtn text='See Performance' onClick={this.directToChildReportPage} />
                    </div>
                </div>
                </div>
                
            </div>
        )
    }
}
export default ChildReport
