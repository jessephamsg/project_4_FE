import {useReducer,useEffect,useState} from 'react'
import generate from "generate-maze"

// CONSTANT
const LOADED = "maze/LOADED"
const LEFT ='maze/LEFT'
const RIGHT = 'maze/RIGHT'
const UP ='maze/UP'
const DOWN ='maze/DOWN'
const KEY_PRESS = 'maze/KEY_PRESS'

//REDUCER
const reducer = (state, {type,payload}) => {
    switch (type) {
        case LOADED:
            return {...state,loaded:true, maze:payload}
        case KEY_PRESS: {
            const cell = state.maze[state.y][state.x]
            if (payload === "ArrowLeft" && !cell.left) return { ...state, x: Math.max(0, state.x-1) }
            if (payload === "ArrowUp" && !cell.top) return { ...state, y: Math.max(0, state.y -1) }
            if (payload === "ArrowRight" && !cell.right)
                return { ...state, x: Math.min(state.maze.length, state.x+1) }
            if (payload === "ArrowDown" && !cell.bottom)
                return { ...state, y: Math.min(state.maze.length, state.y+1) }
            }
            console.log(state)
        default:
            return state
    }
}

// STATE HOOK
const useMaze = () => {
    const [state, dispatch] = useReducer(reducer, {
      maze: [],
      x: 0,
      y: 0
    })
    const [endpt, setEndpt] = useState({x:'',y:''})

    useEffect(() => {
      const maze = generate(8)

      const handleKeyPress = ({ key }) => {
        // document.addeventlistener, if start button is click, timer will start. 
        // log setstarttime
        // check if character position and end position is the same, if true,
        // 
        // clearinterval and log stoptime
        // stoptime - setstarttime = score. score/1000 is the seconds user took to solve the puzzle
        // 

        dispatch({ type: KEY_PRESS, payload: key })
        console.log('pressed', state) // each time a key is press, this is called
      }
      dispatch({ type: LOADED, payload: maze })

      document.addEventListener("keydown", handleKeyPress)
      return () => {
        document.removeEventListener("keydown", handleKeyPress)
        console.log('returned', state)
        return state
      }
    }, [])
    return state
  }
  
  export default useMaze