import React, { Component } from 'react'


export class Timer extends Component {

    componentDidMount() {
        if (this.props.gameHasStarted) {
            const timer = setInterval(async () => {
                await this.props.reduceTime()
                if (this.props.remainingTime <= 0) {
                    clearInterval(timer);
                }
            }, 1000);
        }
    }

    render() {
        return (
            <h1>Timer: {this.props.remainingTime}</h1>
        )
    }
}

export default Timer
