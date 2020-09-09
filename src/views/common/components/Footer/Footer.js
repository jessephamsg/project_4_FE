//DEPENDENCIES
import React, { Component } from 'react';

//STYLES
import './style_module.css';


class Footer extends Component {

    render() {
        return (
            <footer>
                <p> &copy; {new Date().getFullYear()} | Project 4 title | Developed by JJYJ  Lina, Tam, Yuejia</p>
            </footer>
        )
    }
}

export default Footer 
