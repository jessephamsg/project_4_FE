import React, { Component, Fragment, useState, useEffect} from 'react'
import './style_module.css'

function Gameboard() {
        const [seconds, setSeconds] = useState(5);
        // const [isRunning, setIsRunning] = useState(false)
      
        const startTimer = async (event) => {
            event.preventDefault();
                const interval = setInterval(() => {
                setSeconds(seconds => seconds -= 1);
                }, 1000);
                if(seconds <=0) {
                    clearInterval(interval)
                }
                return () => clearInterval(interval);
          }
        
    return (
        <Fragment>
            <div className='gameboard'>
                <div className='instruction'>
                    <h1>instruction</h1>
                    <div>
                        <h3>how to play the game</h3>
                    </div>
                </div>
                <div className='gameinterface_container'>
                    <h1>Picture Puzzle!</h1>
                    <div className='gameinterface'>
                        <canvas id= 'gameCanvas' width='700px' height='700px'></canvas>
                    </div>
                </div>
                <div className='scoreboard'>
                    <h1>Score</h1>
                    <div>
                        <div>
                            <h3>highest score:</h3>
                            <h3>Your current score: <span></span></h3>
                            <h3>timer: <span>{seconds}</span></h3>
                        </div>
                        <div className='interactive'>
                            <button onClick={startTimer}>START</button>
                            <button>Submit score</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
        )
    }

// export class Gameboard extends Component {

//     render() {
//         return (
//             <Fragment>
//                 <div className='gameboard'>
//                     <div className='instruction'>
//                         <h1>instruction</h1>
//                         <div>
//                             <h3>how to play the game</h3>
//                         </div>
//                     </div>
//                     <div className='gameinterface_container'>
//                         <h1>Picture Puzzle!</h1>
//                         <div className='gameinterface'>
//                             <canvas id= 'gameCanvas' width='700px' height='700px'></canvas>
//                         </div>
//                     </div>
//                     <div className='scoreboard'>
//                         <h1>Score</h1>
//                         <div>
//                             <div>
//                                 <h3>highest score:</h3>
//                                 <h3>Your current score: <span></span></h3>
//                                 <h3>timer: <span></span></h3>
//                             </div>
//                             <div className='interactive'>
//                                 <button onClick={this.startTimer}>START</button>
//                                 <button>Submit score</button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </Fragment>
//         )
//     }
// }

export default Gameboard
