import React from "react"
import styled from "styled-components"

const showBorder= dir => (dir ? "2px solid green" : "2px solid black")

const StyledMaze = ({maze,className, width, height, blockSize}) => {
    return (
    <section className={className}>
        {maze.map(row => 
            row.map(({ x, y, top, left, right, bottom }) => (
                <div
                  key={`${x}-${y}`}
                  className="square"
                  style={{
                    gridColumn: `${Math.min(x + 1, width)} / span 1`,
                    gridRow: `${Math.min(y + 1, height)}/ span 1`,
                    borderRight: showBorder(right),
                    borderLeft: showBorder(left),
                    borderTop: showBorder(top),
                    borderBottom: showBorder(bottom)
                  }}
                />
              ))
            )}
    </section>
    )}

const MazeStyle = styled(StyledMaze)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: grid;
  grid-template: ${({ width, height,blockSize}) => `repeat(${width}, ${blockSize}) / repeat(${height}, ${blockSize})`};
  .square {
    border-color: green;
    border-width: 4px;
    border-style: solid;
  }
`

export default MazeStyle