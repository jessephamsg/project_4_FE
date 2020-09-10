import styled from'styled-components'
import React from 'react'
const FieldStyle = styled.section`
    position: relative;
    display : grid;
    grid-template : ${({width, height, blockSize}) => `repeat(${width},${blockSize})/repeat(${height},${blockSize})`};
    justify-content : center;
    justify-self:center;
    align-self :center;
    background: black;
    &::before,
    &::after {
      position: absolute;
      background: red;
      height: 1.5rem;
      font-size: 1rem;
      font-weight: 700;
      padding: 0 0.5rem;
      color: white;
      border-radius: 2px;
    }
    &:before {
      content: "start";
      top: 0;
      right: calc(100% + 0.5rem);
    }
    &:after {
      content: "end";
      bottom: 0;
      left: calc(100% + 0.5rem); 
      // calc is css calculate
    }  
`

export default FieldStyle