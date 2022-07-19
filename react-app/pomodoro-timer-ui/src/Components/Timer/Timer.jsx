import * as React from "react";
import { useTimer } from "react-timer-hook";
import resetIcon from "../../Assets/restart.svg";
import pauseIcon from "../../Assets/pause.svg";
import forwardIcon from "../../Assets/forward.svg";
import startIcon from "../../Assets/play.svg";
import "./Timer.css";

//sets the correct amount of time for pomodoro timer
function pomodoro() {
    const time = new Date();
    time.setSeconds(time.getSeconds() + 1500);
    return time;
}

//sets the correct amount of time for short break timer
function shortBreak() {
    const time = new Date();
    time.setSeconds(time.getSeconds() + 300);
    return time;
}

//sets the correct amount of time for long break timer
function longBreak() {
    const time = new Date();
    time.setSeconds(time.getSeconds() + 900);
    return time;
}

export default function Timer({ session, setSession }) {
    //expiryTimestamp tells the timer how long the timer should run for
    let expiryTimestamp;
    
    //function initially sets timer based on what session is set
    if(session === "pomozone") {
        expiryTimestamp = pomodoro();
    } else if(session === "short-break") {
        expiryTimestamp = shortBreak();
    } else {
        expiryTimestamp = longBreak();
    }

    //timer
    const {
        seconds,
        minutes,
        hours,
        isRunning,
        pause,
        resume,
        restart,
    } = useTimer({ expiryTimestamp, autoStart: false, onExpire: () => console.warn('onExpire called') });

    //move the timer forward a session. sets the new session, and resets the timer and expiryTimestamp
    function forwardTimer() {
        if(session === "pomozone") {
            setSession("short-break");
            expiryTimestamp = shortBreak();
        } else if(session === "short-break") {
            setSession("long-break");
            expiryTimestamp = longBreak();
        } else {
            setSession("pomozone");
            expiryTimestamp = pomodoro();
        }
        restart(expiryTimestamp, false);
    }

    //restarts the timer based on the current session
    function restartTimer() {
        if(session === "pomozone") {
            expiryTimestamp = pomodoro();
        } else if(session === "short-break") {
            expiryTimestamp = shortBreak();
        } else {
            expiryTimestamp = longBreak();
        }

        restart(expiryTimestamp, false);
    }

    return (
        <div className="timer">
            <div className="content">
                <div className="timer-area">
                    <div className="time">
                        <span>{minutes}</span><span>:{(seconds < 10) ? '0' + seconds : seconds}</span>
                    </div>
                </div>
                <h2>{session.replace("-", " ")}</h2>
                <div className="buttons">
                    <button className={`${session}`} onClick={restartTimer}>
                        <img src={resetIcon} alt="restart timer"></img>
                    </button>
                    <button className={`${session}`} onClick={isRunning ? pause : resume}>
                        <img src={isRunning ? pauseIcon : startIcon} alt={isRunning ? "pause timer": "start timer"}></img>
                    </button>
                    <button className={`${session}`} onClick={forwardTimer}>
                        <img src={forwardIcon} alt="move to next session"></img>
                    </button>
                </div>
            </div>
        </div>
    )
}