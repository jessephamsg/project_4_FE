import React, { Component, Fragment, useState } from 'react'
import './style_module.css'
import Button from '../../common/elements/Buttons'
import api from '../../../api'

function LoginPage () {
    const [state, setstate] = useState({parentName: '', password: ''})

    const handleChange = async e => {
        e.preventDefault()
        setstate({...state,[e.target.name]:e.target.value})
    }
    const login = async e => {
        e.preventDefault()
        try {
            const login = await api.login(state)
            const token = await JSON.stringify(login.data)
            if (login) {
                console.log(JSON.stringify(login.data))
                localStorage.setItem("CurrentUser", login.data.currentUser._id) // set localstorage a token
                // extract isAuthenticated and current user from login.data
                // then createcontext and use react hook to set currentuser data to current state
                // then wrap in app.js and put authcontex.provider
            }
        } catch (e) {
            console.log(e)
        }
    }
    const getlocalstorage = e => {
        const session = localStorage.getItem('CurrentUser')
        console.log(JSON.parse(session))
    }

        return (
            <Fragment>
                <div className='login'>
                    <form onSubmit={login}>
                        <input 
                            type='text' 
                            name='parentName' 
                            placeholder='username' 
                            value={state.username} 
                            onChange={handleChange} >
                        </input>
                        <input 
                            type='password' 
                            name='password' 
                            value={state.password} 
                            placeholder='password'
                            onChange={handleChange} > 
                        </input>
                        <Button type='submit' text='Sign in!'/>
                        <a href='/register'>New? Sign up here!</a>
                        
                    </form>
                    <Button text='getstorage' onClick={getlocalstorage}/>
                </div>
                
            </Fragment>
        )
    
}

export default LoginPage
