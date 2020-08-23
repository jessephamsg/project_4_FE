//DEPENDENCIES
import React, {Component} from 'react';

//STYLES
import './style_module.css';


class ListOptions extends Component {
    constructor (props) {
        super (props);
    }
    render () {
        return (
            <div className='levelOptions'>
                {this.props.options.map(option => {
                    return (
                        <div
                            style = {{
                                backgroundImage: `url(${require(`./config/assets/${option}.png`)})`
                            }}
                            className='option'
                        >
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default ListOptions