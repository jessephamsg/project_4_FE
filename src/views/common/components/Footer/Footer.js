//DEPENDENCIES
import React, { Component } from 'react';

//STYLES
import './style_module.css';


class Footer extends Component {

    render() {
        return (
            <footer>
                <p> &copy; {new Date().getFullYear()} | TLY education | Developed by Lina, Tam, Yuejia</p>
            </footer>
        )
    }
}

export default Footer 
