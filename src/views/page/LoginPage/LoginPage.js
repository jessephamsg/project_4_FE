//DEPENDENCIES
import React, {Fragment, useState ,useContext} from 'react'
import {useHistory} from 'react-router-dom'

//STYLES
import './style_module.css'

//INTERACTION LOGICS
import { AuthService } from '../../../interactions/AuthService';
import LoggingInteractions from '../../../interactions/Logging';

//COMMON ELEMENTS
import Button from '../../common/elements/Buttons';
import Input from '../../common/elements/Input/Input';


const LoginPage = () => {
    
    const [state, setstate] = useState({username: '', password: ''})
    const context = useContext(AuthService); // extract value from authcontext
    const history = useHistory()
    const [err, seterr] = useState(false)
    
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
            seterr(true)
        }
    }

    return (
        <Fragment>
            <div className='loginPage'>
                <div className='login'>
                    <h1>Log in</h1>
                    {err? 
                    <p>Oops! either your username or password is wrong!</p> 
                    : null}
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
