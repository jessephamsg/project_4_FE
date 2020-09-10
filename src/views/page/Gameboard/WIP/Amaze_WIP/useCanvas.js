import React, {useRef,useState, useEffect} from 'react'


let tileW=40, tileH=40; // each tile size
let mapW = 10, mapH = 10; // map size. 50 by 50 tiles. 
let currentSec = 0, frameCount = 0, frameLastSec = 0;
let gameMap = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    1, 1, 0, 1, 1, 0, 0, 1, 0, 0,
    0, 1, 0, 0, 1, 0, 0, 1, 0, 0,
    0, 1, 0, 1, 1, 1, 1, 1, 1, 1,
    0, 1, 0, 1, 0, 1, 0, 0, 0, 0,
    0, 1, 0, 1, 0, 1, 0, 0, 0, 0,
    0, 1, 0, 1, 0, 1, 0, 0, 0, 0,
    0, 1, 0, 1, 0, 1, 1, 1, 0, 0,
    0, 1, 1, 1, 0, 1, 0, 1, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
];
function drawGame(ctx) {
    if(ctx == null) {return}
    let sec = Math.floor(Date.now()/1000);
    console.log(sec)
    if(sec != currentSec ) {
        currentSec = sec;
        frameLastSec = frameCount;
        frameCount = 1;
    } else {frameCount++}

    for (let y= 0; y< mapH; y++) {
        for (let x= 0; x< mapW; x++) {
            switch (gameMap[((y*mapW)+x)]) {
                case 0:
                    ctx.fillStyle = '#999999';
                    break;
                default:
                    ctx.fillStyle = '#eeeeee';
            }
            ctx.fillRect(x*tileW, y*tileH, tileW, tileH);
        }
    }
    ctx.fillStyle = "#ff0000";
    ctx.fillText("FPS: " + frameLastSec, 10 , 20);
    // ctx.clearRect(0,0 ,mapW, mapH)
    console.log('done')
    // return drawGame(ctx)
}
    
export function useCanvas () {
    const canvasRef = useRef(null)



    useEffect(() => {
        const canvasObj = canvasRef.current;
        const ctx = canvasObj.getContext('2d')
        let animeId;
        const render = () => {
            frameLastSec++;
            drawGame(ctx)
            animeId = window.requestAnimationFrame(render)
        }
        // render()
        return () => {
            window.cancelAnimationFrame(animeId)
        }
        // drawGame(ctx)
        
        },[drawGame]);
    
    return canvasRef
}