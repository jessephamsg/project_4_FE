import React, { Component, Fragment } from 'react'
import './style_module.css'

export class LoginPage extends Component {

    render() {
        return (
            <Fragment>
                <div className='login'>
                    <form action='/home/parent' method='get'>
                        <input type='text' name='email' placeholder='your email' value='' onChange=''></input>
                        <input type='password' name='password' value='' placeholder='password'></input>
                        <button type='submit'>Sign in</button>
                        <a href='/register'><button type='button' style={{width:'100%'}}>New? Sign up here!</button></a>
                    </form>
                </div>
                
            </Fragment>
        )
    }
}

export default LoginPage
