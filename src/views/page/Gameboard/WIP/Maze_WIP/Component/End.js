import React from 'react'
import styled from "styled-components"

const Endpt = ({ x, y, className, width,height }) => {
    console.log('characterstyle', x,y)
  return (
    <div 
        className={className} 
        style={
            { 
                gridColumn: Math.min(x + 1, width), 
                gridRow: Math.min(y + 1, height) 
            }
        }> 
    </div>
  )
}

const End = styled(Endpt)`
  background: red;
  margin: 2px;
  border-radius: 2px;
`

export default End