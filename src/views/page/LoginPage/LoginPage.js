import React, { Component, Fragment, useState ,useContext} from 'react'
import './style_module.css'
import Button from '../../common/elements/Buttons'
import api from '../../../api'
import { AuthContext } from '../../../AuthContext';
import local from '../../../storage/localStorage'
import {useHistory} from 'react-router-dom'



function LoginPage () {
    const [state, setstate] = useState({parentName: '', password: ''})
    const context = useContext(AuthContext); // extract value from authcontext
    const history = useHistory()
    
    const handleChange = async e => {
        e.preventDefault()
        setstate({...state,[e.target.name]:e.target.value})
    }
    const login = async e => {
        e.preventDefault()
        try {
            const login = await api.login(state)
                const { _id, parentName} = login.data.currentUser
                console.log(login.data)
                local.set("currentID", _id) // set localstorage a token
                local.set("currentUser",parentName)
                context.setUser(parentName)
                context.setIsAuthenticated(true)
                history.push(`/home/${parentName}`) // does not refresh entire page
                // window.location.href = `/home/${parentName}` // refresh the entire page
        } catch (e) {
            console.log(e)
        }
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
                </div>
                
            </Fragment>
        )
    
}

export default LoginPage
