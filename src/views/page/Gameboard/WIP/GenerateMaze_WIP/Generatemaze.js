// draw map
// draw character
// 

import React, { Component } from 'react'
import Sketch from 'react-p5'
import style from './style.module.css'

function removeWalls (a,b) {
    // remove the wall that is in btween cell a and cell b
    let x = a.i - b.i 
    if (x === 1) {
        a.walls[3] = false;
        b.walls[1] = false;
    } else if (x === -1) {
        a.walls[1] = false;
        b.walls[3] = false;
    }
    let y = a.j - b.j 
    if (y === 1) {
        a.walls[0] = false;
        b.walls[2] = false;
    } else if (y === -1) {
        a.walls[2] = false;
        b.walls[0] = false;
    }
    console.log('remove')
}

function index (i, j) {
    if(i< 0 || j< 0 || i > cols-1 || j > rows-1) {
        return -1
    }
    return i+j * cols;
}

function Cell (i,j,p5) {
    this.i=i;
    this.j=j;
    this.visited= false;
    this.walls = [true, true, true, true]; /*[top , right, bottom, left]*/
    this.checkNeighbors = ()=> {
        let neighbors = []
        let top    = grid[index ( i   , j-1 )];
        let right  = grid[index ( i+1 , j   )];
        let bottom = grid[index ( i   , j+1 )];
        let left   = grid[index ( i-1 , j   )];
        if (top    && !top.visited) {
            neighbors.push(top);
        }
        if (right  && !right.visited) {
            neighbors.push(right);
        }
        if (bottom && !bottom.visited) {
            neighbors.push(bottom);
        }
        if (left   && !left.visited) {
            neighbors.push(left);
        }
        if (neighbors.length > 0) {
            let r = p5.floor(p5.random(0, neighbors.length))
            return neighbors[r]
        } else {
            return undefined
        }
    }
    this.highlight = (p5) => {
        let x = this.i*w;
        let y = this.j*w;
        p5.noStroke();
        // p5.fill(0,0,255,100)
        p5.rect(x,y,w,w);
    }
    this.show = (p5)=> {
        let x = this.i*w;
        let y = this.j*w;
        p5.stroke(250);
        // let topLToTopR = (x,y,x+w,y)
        // let topRToBottomR = (x+w,y , x+w,y+w)
        // let bottomRToBottomL = (x+w, y+w , x,y+w)
        // let topLToBottomL = (x,y , x,y+w)
        if(this.walls[0]) {
            p5.line(x   ,  y     ,  x+w  ,  y) /*draw top*/
        }
        if(this.walls[1]) {
            p5.line(x+w ,  y     ,  x+w  ,  y+w) /*draw right*/
        }
        if(this.walls[2]) {
            p5.line(x+w ,  y+w   ,  x    ,  y+w) /*draw bottom*/
        }
        if(this.walls[3]) {
            p5.line(x   ,  y+w   ,  x    ,  y) /*draw left*/
        }
        // p5.noFill();

        if(this.visited) {
            p5.noStroke();
            p5.rect(x,y,w,w)
            p5.fill(155,0,205,100)
        }           
    }
}

//global variables
let cols, rows;
let w = 50; 
let grid = []
let current;
let stack = [];

export default class Generatemaze extends Component {


    setup = (p5) => {
        let board = document.getElementById('sketchboard')
        p5.frameRate(60)
        p5.createCanvas(500, 500).parent(board)
        cols = p5.floor(p5.width/w)
        rows = p5.floor(p5.height/w)

        for (let j=0; j < rows; j++) {
            for (let i=0; i < cols; i++) {
                let cell = new Cell(i,j,p5)
                grid.push(cell)
            }
        }
        current = grid[0]; // starting position
    }
    draw = (p5) => {
        p5.background(5);
        for (let i=0; i <grid.length ; i++) {
            grid[i].show(p5);
        }
        current.visited = true;
        current.highlight(p5)
        // STEP 1 choose random unvisted cell
        let nextCell = current.checkNeighbors();
        if (nextCell) {
            nextCell.visited = true;
        // STEP 2 push the current cell to the stack
            stack.push(current)
        // STEP 3 remove wall
            removeWalls(current, nextCell)
        // STEP 4 make the chosen cel the current cell and mark as visited
            current= nextCell;
        } else if (stack.length > 0) {
            let cell = stack.pop();
            current = cell;
        }
    }

    render() {
        return (
            <div className={style.container}id='sketchboard'>
                {/* <P5Wrapper sketch={sketch} color={'red'}></P5Wrapper> */}
                <Sketch setup={this.setup} draw={this.draw}/>
            </div>
        )
    }
}