import React, { Component, useState} from 'react'
import './style_module.css'
import Button from '../../common/elements/Buttons'
import api from '../../../api'


// function RegisterPage () {
//     const [payload, setPayload] = useState({
//         username : '',
//         password : '',
//         email : ''
//     })

//     const updateUsername = async (e) => {
//         e.preventDefault()
//         console.log(e.target.value)
//         console.log(e.target.name)
        
//         await setPayload(payload => {payload[e.target.name] = e.target.value} )
//         console.log(payload.username)
//     }

export class RegisterPage extends Component {
    constructor(props) {
        super(props)  
        this.state = {
             username: '',
             email : '',
             password : '',
             password2 : ''
        }

    }
    handleChange = async e => {
        e.preventDefault()
        await this.setState({
            [e.target.name] : e.target.value
        })
    }
    register = async e => {
        e.preventDefault()
        const payload = {
            parentName : this.state.username,
            parentEmail : this.state.email,
            parentPassword : this.state.password
        }
        if (this.state.password !== this.state.password2) {
            await this.setState({
                passwordError :true,
                error :false,
                passwordMsg : 'Password do not match. Please try again'
            })
            return;
        } else {
            this.setState({
                passwordError :false
            })
        }
        
        try {
            const response = await api.registerParent(payload);
            if (response) window.location.href='/login'
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
                        name='username' 
                        placeholder='username' 
                        value={this.state.username} 
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
