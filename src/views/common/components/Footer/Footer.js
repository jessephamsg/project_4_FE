import React, { Component } from 'react'
import './style_module.css'

class Footer extends Component {

    render() {
        return (
            <footer>
                <p> &copy; {new Date().getFullYear()} | Project 4 title | Developed by JJYJ  Lina, Tam, Yuejia</p>
                <a href='/'><button type='button' style={{width:'100%'}}>About Us</button></a>
            </footer>
        )
    }
}

export default Footer 
