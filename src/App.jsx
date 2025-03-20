import React, { useState, useRef } from "react";
import "./App.css"; // Import CSS

const App = () => {
  const [milliSec, setMillisec] = useState(0);
  const [second, setSecond] = useState(0);
  const [minute, setMinute] = useState(0);
  const [hour, setHour] = useState(0);

  const timer = useRef(null);
  const msRef = useRef(0);
  const secRef = useRef(0);
  const minRef = useRef(0);
  const hourRef = useRef(0);
  const divRef = useRef();

  function handleStart() {
    if (!timer.current) {
      timer.current = setInterval(() => {
        msRef.current += 10;

        if (msRef.current >= 1000) {
          msRef.current = 0;
          secRef.current += 1;
        }

        if (secRef.current >= 60) {
          secRef.current = 0;
          minRef.current += 1;
        }

        if (minRef.current >= 60) {
          minRef.current = 0;
          hourRef.current += 1;
        }

        // Update UI
        setMillisec(msRef.current);
        setSecond(secRef.current);
        setMinute(minRef.current);
        setHour(hourRef.current);
      }, 1);
    }
  }

  function handleStop() {
    clearInterval(timer.current);
    timer.current = null;
  }

  function handleReset() {
    clearInterval(timer.current);
    timer.current = null;
    msRef.current = 0;
    secRef.current = 0;
    minRef.current = 0;
    hourRef.current = 0;
    setMillisec(0);
    setSecond(0);
    setMinute(0);
    setHour(0);
    divRef.current.innerHTML = ""; // Clear lap records
  }

  function handleLap() {
    const lapTime = document.createElement("p");
    lapTime.textContent = `Lap: ${String(hour).padStart(2, "0")}:${String(
      minute
    ).padStart(2, "0")}:${String(second).padStart(2, "0")}.${String(
      milliSec
    ).padStart(3, "0")}`;
    lapTime.classList.add("lap-item");
    divRef.current.appendChild(lapTime);
  }

  return (
    <div className="stopwatch-container">
      <div className="display">
        <p>
          {String(hour).padStart(2, "0")}:
          {String(minute).padStart(2, "0")}:
          {String(second).padStart(2, "0")}:
          {String(milliSec).padStart(3, "0")}
        </p>
      </div>
      <div className="button-container">
        <button className="btn start" onClick={handleStart}>
          Start
        </button>
        <button className="btn stop" onClick={handleStop}>
          Pause
        </button>
        <button className="btn reset" onClick={handleReset}>
          Reset
        </button>
        <button className="btn lap" onClick={handleLap}>
          Lap
        </button>
      </div>
      <div className="laps-container" ref={divRef}></div>
    </div>
  );
};

export default App;
