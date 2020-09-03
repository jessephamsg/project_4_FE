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
        console.log(kidName);
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
        const kidName = this.state.kidName;
        if(kidName === null) {
            return <div>loading</div>
        }
        return (
            <div>
                {Components (gameName, kidName)}
            </div>
        )
    }
}

export default Gameboard
