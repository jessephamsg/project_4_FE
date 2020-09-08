import React, { useState, useEffect } from 'react';
import {
    LineSeries, Tooltip, AreaSeries, BarSeries,Rectangle,
    ChartProvider, XAxis, YAxis,
} from 'rough-charts'



const data = []

const CompletionRate = (props) => {
    const [activeIndex, setIndex] = React.useState(-1)

    useEffect(() => {
        for (const [index,gameName] of props.allGamesAttempted.entries()) {
            data.push({game: gameName, completion: props.completionRate[index]})
        }
    })

    return (
      <ChartProvider
        data={data}
        height={400}
        {...props}
      >
        <YAxis />
        <XAxis dataKey="game" />
        <BarSeries
          dataKey="completion"
          options={{ fill: '#fe4a49' }}
        >
          {
            (item, itemProps, index) => (
              <Rectangle
                key={index}
                {...itemProps}
                onMouseOver={() => {
                  setIndex(index)
                }}
                options={{
                  ...itemProps.options,
                  fillStyle: activeIndex === index ? 'solid' : undefined,
                }}
                onMouseOut={() => setIndex(-1)}
              />
            )
          }
        </BarSeries>
        <Tooltip />
      </ChartProvider>
    )
  }

export default CompletionRate