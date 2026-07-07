import { useState, useRef } from 'react'
import './App.css'

const formatTime = (totalSeconds) => {
  const hours = Math.floor(totalSeconds/3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  const pad = (n) => String(n).padStart(2, '0')

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
}

// let intervalID; // this is oldway. new one is useRef
// if we use useState for intervalID, then on re-render, clock will reinitialise to 0. 
// stopClock no need to re-render. it just freezes page. no change in DOM actually. 
function App() {
  const [secondsPassed, setSecondsPassed] = useState(0)
  // const [intervalID, setIntervalID] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const intervalID = useRef(0) 

  const startClock = () => {
    // so, this if check prevents creation of multiple setIntervals on double-clicking error.
    if(isRunning) return;

    intervalID.current = setInterval(() => {
      // secondsPassed+ 1 won't work continuously. we need to give (s=> s+1)
      // it will remember the value when it started which is 0
      // can pass final value or s=> s+1 (s gets current state value not old bound value - 0)
      setSecondsPassed(s => s+1)
      // setIntervalID(intervalID) // this triggers re-render once again and its no efficient so useRef 
      // useRef is a global variable kind of and prevents extra re-rendering. middleground is useRef
    }, 1000)

    setIsRunning(true)
  }

  // useRef here
  const stopClock = () => {
    // clearInterval(intervalID);
    clearInterval(intervalID.current);
    setIsRunning(false)
  }

  const resetClock = () => {
    clearInterval(intervalID.current);
    setSecondsPassed(0)
    setIsRunning(false)
  }

  return (
    <div className="clock-page">
      <div className="clock-card">
        <div className={`status-dot ${isRunning ? 'status-dot--live' : ''}`} />

        <div className="clock-display">
          {formatTime(secondsPassed)}
        </div>
        <div className="clock-controls">
          <button className="btn btn--start" onClick={startClock}>Start</button>
          <button className="btn btn--stop" onClick={stopClock}>Stop</button>
          <button className="btn btn--reset" onClick={resetClock}>Reset</button>
        </div>
      </div>
    </div>
  )
}

export default App
