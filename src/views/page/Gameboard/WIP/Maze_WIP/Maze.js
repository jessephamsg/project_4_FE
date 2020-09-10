import React, { Component } from 'react'
import style from './style.module.css'
import FieldStyle from './Component/FieldStyle'
import useMaze from './Component/MazeState'
import MazeStyle from './Component/MazeStyle'
import Character from './Component/CharacterStyle'
import End from './Component/End'

export default function Maze (props) {
    const {x,y, maze,loaded} = useMaze()
    console.log(x + loaded)
    return (
        <main className={style.container}>
            <FieldStyle width={8} height={8} blockSize ='10vmin'>
                <MazeStyle maze={maze} width={8} height={8} blockSize ='10vmin'/>
                <Character x={x} y={y} width={8} height={8} />
                <End x={maze.length-1} y={maze.length-1} width={8} height={8}/>
            </FieldStyle>
        </main>
    )
}