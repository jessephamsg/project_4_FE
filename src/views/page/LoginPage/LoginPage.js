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
            const token = await JSON.stringify(login.data)
            if (login) {
                console.log(token)
                localStorage.setItem("currentUser", login.data.currentUser._id) // set localstorage a token
                const {isAuthenticated, currentUser} = login.data
                console.log(isAuthenticated)
                console.log(currentUser.parentName) // containers userid and username
                authContext.setUser(currentUser.parentName)
                authContext.setIsAuthenticated(isAuthenticated)
            }
        } catch (e) {
            console.log(e)
        }
    }
    const getlocalstorage = async e => {
        e.preventDefault()
        
        try {
            const id = localStorage.getItem("currentUser")
            console.log(typeof id + id)
            const result = await api.isAuthenticated(id)
            console.log(result)
        }catch (e) {
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
                    <Button text='getstorage' onClick={getlocalstorage}/>
                </div>
                
            </Fragment>
        )
    
}

export default LoginPage
