import React, { Component, Fragment } from 'react'
import './style_module.css'


export class RegisterPage extends Component {

    render() {
        return (
            <Fragment>
                <div className='register'>
                <h1>Sign Up</h1>
                    <form className='registerForm'>
                        <input type='text' name='username' placeholder='username' value='' onChange=''></input>
                        <input type='password' name='password' placeholder='password'value=''></input>
                        <input type='email' name ='email' value='' placeholder='email'></input>
                        <div className='radioButton'>
                        <p>Your children calls you by...</p>
                            <div>
                                <input type='radio' id='papa' name ='parentRole' value= 'Papa'/>
                                <label for='papa'>Papa</label>
                            </div>
                            <div>
                                <input type='radio' id='mama' name ='parentRole' value= 'Mama'/>
                                <label for='papa'>Mama</label>
                            </div>
                        </div>
                        <button type='submit'>Register!</button>
                        <a href='/'><button type='button' style={{width:'100%'}}>About Us</button></a>
                    </form>
                </div>
            </Fragment>
        )
    }
}

export default RegisterPage
