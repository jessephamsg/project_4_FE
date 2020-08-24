import React, { Component, Fragment, useState ,useContext} from 'react'
import './style_module.css'
import Button from '../../common/elements/Buttons'
import api from '../../../api'
import { AuthContext } from '../../../AuthContext';

function LoginPage () {
    const [state, setstate] = useState({parentName: '', password: ''})
    const authContext = useContext(AuthContext);

    const handleChange = async e => {
        e.preventDefault()
        setstate({...state,[e.target.name]:e.target.value})
    }
    const login = async e => {
        e.preventDefault()
        try {
            const login = await api.login(state)
            if (login) {
                localStorage.setItem("currentUser", login.data.currentUser._id) // set localstorage a token
                // const {isAuthenticated, currentUser} = login.data
                // authContext.setUser(currentUser.parentName)
                // authContext.setIsAuthenticated(isAuthenticated)
                
            }
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
