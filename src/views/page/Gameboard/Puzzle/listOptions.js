//DEPENDENCIES
import React, {Component} from 'react';

//STYLES
import './style_module.css';


class ListOptions extends Component {
    constructor (props) {
        super (props);
        this.updateOption = this.updateOption.bind(this);
    }

    updateOption (e) {
        const option = parseInt(e.target.id) + 1;
        const level = this.props.level;
        this.props.updateOption(option, level)
    }

    render () {
        return (
            <div className='levelOptions'>
                {this.props.options.map((option,index) => {
                    return (
                        <div
                            style = {{
                                backgroundImage: `url(${require(`./config/assets/${option}.png`)})`
                            }}
                            id={index}
                            className='option'
                            onClick={this.updateOption}
                        >
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default ListOptions