import React from "react"
import styled from "styled-components"



const Character = ({ x, y, className, width,height }) => {
    console.log('characterstyle',className, x,y)
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

const StyledCharacter = styled(Character)`
  background: yellow;
  margin: 2px;
  border-radius: 50%;
`
export default StyledCharacter