//DEPENDENCIES
import React, { Component} from 'react';

//COMMON ELEMENTS
import Button from '../../common/elements/Buttons';
import Input from '../../common/elements/Input/Input'

//INTERACTION LOGICS
import ChildProfileInteractions from '../../../interactions/ManageChildrenProfile';

//STYLES
import './style_module.css';



export class RegisterPage extends Component {

    constructor(props) {
        super(props)  
        this.state = {
             name: '',
             email : '',
             password : '',
             password2 : ''
        }
    }

    handleChange = async e => {
        e.preventDefault()
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    register = async e => {
        e.preventDefault()
        const payload = {
            name : this.state.name,
            email : this.state.email,
            password : this.state.password
        }
        if (this.state.password !== this.state.password2) {
            this.setState({
                passwordError :true,
                error :false,
                passwordMsg : 'Password do not match. Please try again'
            })
            return;
        } 
        else {
            this.setState({
                passwordError :false
            })
        }
        try {
            const response = await ChildProfileInteractions.createUser.registerParent(payload);
            console.log(response.data.success)
            console.log(response.data.data)
            if(response.data.success === false) {
                this.setState({
                    error:true,
                    signUpError :true,
                    errorMsg: response.data.data
                })
            } else {
                console.log('success')
                window.location.href='/login'
            }
        } catch(e) {
            this.setState ({
                error : true,
                passwordError :false,
                errorMsg : 'something went wrong due to ' + e.message
            })
            }
        }
    
    render() {
        return (
            <div className='registerPage'>
                <div className='register'>
                <h1>Sign Up</h1>
                {this.state.passwordError? <p>{this.state.passwordMsg}</p> : null}
                {this.state.error? <p>{this.state.errorMsg}</p> : null}
                    <form className='registerForm' onSubmit= {this.register}>
                        <input 
                            type='text' 
                            name='name' 
                            placeholder='name' 
                            value={this.state.name} 
                            onChange={this.handleChange}
                            required='true'>
                        </input>

                        <input 
                            type='password' 
                            name='password' 
                            placeholder='password' 
                            value={this.state.password} 
                            onChange={this.handleChange}
                            required='true'>
                        </input>

                        <input 
                            type='password' 
                            name='password2' 
                            placeholder='re-type password' 
                            value={this.state.password2} 
                            onChange={this.handleChange}
                            required='true'>
                        </input>

                        <input 
                            type='email' 
                            name ='email' 
                            value= {this.state.email} 
                            placeholder='email' 
                            onChange={this.handleChange}
                            required='true'> 
                        </input>

                        <Button type='submit' text='Register!'/>
                    </form>
                </div>
            </div>
        )
    }
}

export default RegisterPage
