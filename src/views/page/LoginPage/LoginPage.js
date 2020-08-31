//DEPENDENCIES
import React, { Component, Fragment, useState ,useContext} from 'react'
import {useHistory} from 'react-router-dom'

//STYLES
import './style_module.css'

//INTERACTION LOGICS
import { AuthService } from '../../../interactions/AuthService';
import LoggingInteractions from '../../../interactions/Logging';

//COMMON ELEMENTS
import Button from '../../common/elements/Buttons'


const LoginPage = () => {
    
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
            const {_id, name} = await LoggingInteractions.Logging.login(state);
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
