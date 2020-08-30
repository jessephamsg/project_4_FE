import React, { Component } from 'react'
import Components from './components.js';


export class Gameboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            gameName: null,
            kidName: null
        }
    }

    getGameID() {
        const gameName = this.props.match.params.gameName;
        this.setState({
            gameName,
        })
    }

    getKidName() {
        const kidName = this.props.match.params.childname;
        this.setState({
            kidName,
        })
    }

    async componentDidMount() {
        await this.getGameID();
        await this.getKidName();
    }

    async componentWillReceiveProps(props) {
        await this.getGameID();
        await this.getKidName();
    }

    render() {
        const gameName = this.state.gameName;
        return (
            <div>
                {Components (gameName)}
            </div>
        )
    }
}

export default Gameboard
