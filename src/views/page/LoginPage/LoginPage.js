import React, { Component, Fragment, useState ,useContext} from 'react'
import './style_module.css'
import Button from '../../common/elements/Buttons'
import api from '../../../api'
import { AuthService } from '../../../services/AuthService';
import local from '../../../storage/localStorage'
import {useHistory} from 'react-router-dom'



function LoginPage () {
    const [state, setstate] = useState({username: '', password: ''})
    const context = useContext(AuthService); // extract value from authcontext
    const history = useHistory()
    
    const handleChange = async e => {
        e.preventDefault()
        setstate({...state,[e.target.name]:e.target.value})
    }
    const login = async e => {
        e.preventDefault()
        try {
            const login = await api.login(state)
                const { _id, username} = login.data.currentUser
                console.log(login.data)
                local.set("currentId", _id) // set localstorage a token
                local.set("currentUser",username)
                context.setUserId(_id)
                context.setUser(username)
                context.setIsAuthenticated(true)
                history.push(`/home/${username}`) // does not refresh entire page
        } catch (e) {
            console.log(e)
        }
    }
        return (
            <Fragment>
                <div className='loginPage'>
                <div className='login'>
                    <form onSubmit={login}>
                        <input 
                            type='text' 
                            name='username' 
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
                </div>
                </div>
                
            </Fragment>
        )
    
}

export default LoginPage
