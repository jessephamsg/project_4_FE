import React, { Component, Fragment, useState ,useContext} from 'react'
import './style_module.css'
import Button from '../../common/elements/Buttons'
import api from '../../../api'
import { AuthService } from '../../../services/AuthService';
import local from '../../../storage/localStorage'
import {useHistory, Link} from 'react-router-dom'
import Input from '../../common/elements/Input/Input';


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
                const { _id, name} = login.data.currentUser
                console.log(login.data)
                // storeUser(_id,name)

                local.set("currentId", _id) // set localstorage a token
                local.set("currentUser",name)
                context.setUserId(_id)
                context.setUser(name)
                context.setIsAuthenticated(true)
                history.push(`/home/${name}`) // does not refresh entire page
        } catch (e) {
            console.log(e)
        }
    }
        return (
            <Fragment>
                <div className='loginPage'>
                <div className='login'>
                    <form onSubmit={login} className='loginForm'>
                    <Input
                        type='text' 
                        name='username' 
                        placeholder='username' 
                        value={state.username} 
                        onChange={handleChange}
                        required={true}
                    />
                    <Input
                        type='password' 
                        name='password' 
                        placeholder='password' 
                        value={state.password} 
                        onChange={handleChange}
                        required={true}
                    />
                    <div className='register-container'>
                        <Button type='submit' text='Sign in!'/>
                        <h4 id = 'h4Register' onClick={() => {history.push('/register')}}>
                            New? Sign up here!
                        </h4>
                    </div>
                    </form>
                </div>
                </div>
                
            </Fragment>
        )
    
}

export default LoginPage
