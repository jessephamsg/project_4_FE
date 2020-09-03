//DEPENDENCIES
import React, { Component, Fragment } from 'react'
import {
    LineSeries, Tooltip, AreaSeries, BarSeries,Rectangle,
    ChartProvider, XAxis, YAxis,
} from 'rough-charts'

const data = [
    { name: 'A', value1: 30, value2: 35 },
    { name: 'B', value1: 90, value2: 17 },
    { name: 'C', value1: 50, value2: 23 },
    { name: 'D', value1: 40, value2: 15 },
    { name: 'E', value1: 70, value2: 39 },
    { name: 'G', value1: 30, value2: 25 },
    { name: 'H', value1: 10, value2: 31},
    { name: 'I', value1: 30, value2: 32 },
]


export class ChildReportPage extends Component {
    state = {
        activeIndex: -1
    }

    render() {
        console.log(this.state)
        return (
            <Fragment>
                <ChartProvider
                    height={400}
                    data={data}
                >
                    <XAxis dataKey="name" />
                    <YAxis />
                    <LineSeries
                        dataKey="value1"
                        options={{
                            stroke: '#fe4a49',
                            strokeWidth: 2,
                        }}
                    />
                    <LineSeries
                        dataKey="value2"
                        options={{
                            stroke: '#fe4a49',
                            strokeWidth: 2,
                        }}
                    />
                    <Tooltip />
                </ChartProvider>

                <ChartProvider
                    data={data}
                    height={400}
                    {...this.props}
                >
                    <AreaSeries
                        dataKey="value1"
                        options={{ stroke: '#03396c' }}
                    />
                    <AreaSeries
                        dataKey="value2"
                        options={{ stroke: '#fe4a49' }}
                    />
                    <YAxis />
                    <XAxis
                        dataKey="name"
                    />
                    <Tooltip />
                </ChartProvider>

                
                <ChartProvider
                    data={data}
                    height={400}
                    {...this.props}
                >
                    <YAxis />
                    <XAxis dataKey="name" />
                    <BarSeries
                        dataKey="value1"
                        options={{ fill: '#fe4a49' }}
                    >
                        {
                            (item, itemProps, index) => (
                                <Rectangle
                                    key={index}
                                    {...itemProps}
                                    onMouseOver={() => {
                                        this.setState({
                                            activeIndex : index
                                        })
                                    }}
                                    options={{
                                        ...itemProps.options,
                                        fillStyle: this.state.activeIndex === index ? 'solid' : undefined,
                                    }}
                                    onMouseOut={() => this.setState({activeIndex: -1})}
                                />
                            )
                        }
                    </BarSeries>
                    <Tooltip />
                </ChartProvider>





                <div>
                    <h1>{this.props.match.params.childname}</h1>
                </div>
            </Fragment>
        )
    }
}

export default ChildReportPage
