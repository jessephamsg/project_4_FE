//DEPENDENCIES
import React, { Component, Fragment } from 'react';

//COMMON COMPONENTS
import GameCard from '../../common/components/Card/GameCard';

//STYLES
import './style_module.css';


export class ChildDashboard extends Component {

    render() {
        return (
            <Fragment>
                <div className='childProfile'>
                    <div className='icon_container'>
                        <img className='childIcon' src='https://i.imgur.com/1JCz8yg.png' alt= 'childname' title='childname'/>
                    </div>
                    <div>
                        <p>{this.props.match.params.childname}</p>
                    </div>
                </div>
                <div className='gameList'>
                    <GameCard gameid='1' childname={this.props.match.params.childname}/>
                    <GameCard gameid='2' childname={this.props.match.params.childname}/>
                    <GameCard gameid='3' childname={this.props.match.params.childname}/>
                    <GameCard gameid='4' childname={this.props.match.params.childname}/>
                </div>
            </Fragment>
        )
    }
}

export default ChildDashboard
