import React, { Component, Fragment } from 'react'

export class ChildReportPage extends Component {

    render() {
        console.log(this.state)
        return (
            <Fragment>
            <div>
                <h1>{this.props.match.params.childname}</h1>
            </div>
            </Fragment>
        )
    }
}

export default ChildReportPage
