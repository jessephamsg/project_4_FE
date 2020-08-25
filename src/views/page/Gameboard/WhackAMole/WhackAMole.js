import React, { Component } from 'react'
import axios from 'axios';

export class WhackAMole extends Component {
    constructor(props) {
        super(props)
        this.state = {
            gameID: null,
            kidName: null,
            maxMole: null,
        }
    }

    getGameID() {
        const gameID = this.props.gameID;
        this.setState({
            gameID: gameID,
        })
    }

    
    async getGameSetting() {
        const gameID = this.state.gameID;
        const rawData = await axios.get(`http://localhost:4000/games/${gameID}`);
        const gameSettings = await rawData.data.data;
        this.setState({
            // maxMole: gameSettings.maxMole,
            maxMole: 3,

        })
    }

    async componentDidMount() {
        await this.getGameID();
        await this.getGameSetting();
    }

    async componentWillReceiveProps(props) {
        await this.getGameID();
        await this.getGameSetting();
    }

    render() {
        return (
            <div>
                This is WhackAMoleGame
            </div>
        )
    }
}

export default WhackAMole
