import React, { Component, Fragment, useContext } from 'react'
import Button from '../../elements/Buttons';
import './style_module.css'
import {AuthContext} from '../../../../AuthContext'
import apis from '../../../../api';
import local from '../../../../storage/localStorage';
import {useHistory} from 'react-router-dom'


// const NavBar = props => {
//     const user = useContext(AuthContext)
//     console.log(user.user)
//     const unAuthNavBar = () => {
//         return (
//             <Fragment>
//             <div className='navbar'>
//                 Not authenticated
//             </div>
//             <div className='navBarRight'>
//             {/* <a href='/register'><Button text={'Sign Up'} onClick = {this.action}></Button></a> */}
//             <Button text={'Sign Up'} onClick = {action}></Button>
//             <a href='/login'><Button text={'Log In'}></Button></a>
//         </div>
//         </Fragment>
//         )
//     }
//     const action = () => {
//                 window.location.href = '/register'
//             }
//     const authNavBar = () => {
//         return (
//             <div className='navbar'>
//                 <ul>
//                     <div className='navBarLeft'>
//                         <li>Project 4 logo</li>
//                         <li><a href='/'>About us</a></li>
//                         <li><a href='/'>Our Games</a></li>
//                     </div>
//                     <div className='navBarRight'>
//                         {/* <a href='/register'><Button text={'Sign Up'} onClick = {this.action}></Button></a> */}
//                         <Button text={'Sign Up'} onClick = {action}></Button>
//                         <a href='/login'><Button text={'Log In'}></Button></a>
//                     </div>
//                 </ul>
//             </div>
//         )
//     }
//     return (
//         <Fragment>
//         {user.user? authNavBar() :unAuthNavBar()}
//         </Fragment>
//     )
// }


export class NavBar extends Component {
    static contextType = AuthContext
    logout = async () => {
        const logout = await apis.logOut()
        console.log(logout.data)
        local.del('currentUser')
        local.del('currentID')
        window.location.href = '/'
        
    }
    goToParentDashboard = async () => {
        // child protection system goes in here 
        window.location.href = `/dashboard/${this.context.user}`
    }

    render() {
        console.log(this.context)
        return (
            <div className='navbar'>
                <ul>
                    <div className='navBarLeft'>
                        <li>Project 4 logo {this.context.user}</li>
                        <li><a href='/'>About us</a></li>
                        <li><a href='/'>Our Games</a></li>
                        <li><a href={`/home/${this.context.user}`}>Home</a></li>
                    </div>
                    {!this.context.user ? 
                    <div className='navBarRight'>
                        <a href='/register'><Button text={'Sign Up'}></Button></a>
                        <a href='/login'><Button text={'Log In'}></Button></a>
                    </div> 
                    :
                    <div className='navBarRight'>
                        <Button text={'Dashboard'} onClick={this.goToParentDashboard}></Button>
                        <Button text={'Log Out'} onClick ={this.logout}></Button> 
                    </div>
                    }
                </ul>
            </div>
        )
    }
}

export default NavBar
