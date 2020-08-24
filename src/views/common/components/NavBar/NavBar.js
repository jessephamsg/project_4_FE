import React, { Component, Fragment, useContext } from 'react'
import Button from '../../elements/Buttons';
import './style_module.css'
import {AuthContext} from '../../../../AuthContext'


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
    action = () => {
        window.location.href = '/register'
    }

    render() {
        console.log(this.context)
        return (
            <div className='navbar'>
                <ul>
                    {! this.context.userid? null :
                    <div className='navBarLeft'>
                        <li>Project 4 logo{this.context.user}</li>
                        <li><a href='/'>About us</a></li>
                        <li><a href='/'>Our Games</a></li>
                    </div>
                    }
                    <div className='navBarRight'>
                        <Button text={'Sign Up'} onClick = {this.action}></Button>
                        <a href='/login'><Button text={'Log In'}></Button></a>
                    </div>
                </ul>
            </div>
        )
    }
}

export default NavBar
