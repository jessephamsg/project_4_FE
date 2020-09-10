import React, {useRef} from'react'
import style from './style.module.css'
import {useCanvas} from './useCanvas'
import Canvas from './Canvas'



export default function Amaze (props) {
    
    return (
        <div className={style.container}>
            <Canvas />
        </div>
    )
}