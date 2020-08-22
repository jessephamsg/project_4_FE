import React, { Component } from 'react'
import WhackAMole from "./WhackAMole"

export class Gameboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            gameID: null,
            kidName: null
        }
    }

    getGameID() {
        const gameID = this.props.match.params.gameid;
        this.setState({
            gameID: gameID,
        })
    }

    getKidName() {
        const kidName = this.props.match.params.childname;
        this.setState({
            kidName: kidName,
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
        const gameID = this.state.gameID;
        if (this.state.gameID === null) {
            return (
                <div> Loading...</div>
            )
        }
        else {
            switch (gameID) {
                case '234':
                    return (
                        <div>
                            <h1>Hi {this.state.kidName}, you're playing {this.state.gameID}</h1>
                            <WhackAMole />
                        </div>
                    );
                default:
                    return (
                        <div>
                            <h1>Hi {this.state.kidName}, you're playing {this.state.gameID}</h1>
                            <h2> Default </h2>
                        </div>
                    );
              }
            
        }

    }
}

export default Gameboard
