import * as React from "react";
import { useTimer } from "react-timer-hook";
import resetIcon from "../../Assets/restart.svg";
import pauseIcon from "../../Assets/pause.svg";
import forwardIcon from "../../Assets/forward.svg";
import startIcon from "../../Assets/play.svg";
import { useSettingsContext } from "../../contexts/SettingsContext";
import "./Timer.css";

export default function Timer() {
    const { settingsStates, settingsSetStates } = useSettingsContext();
    const pomozone = "pomozone";
    const shortBreak = "short-break";
    const longBreak = "long-break"
    //expiryTimestamp tells the timer how long the timer should run for
    let expiryTimestamp = setTime(settingsStates.session);

    function setTime(s) {
        const time = new Date();
        if(s === pomozone) {
            time.setSeconds(time.getSeconds() + 1500);
        } else if(s === shortBreak) {
            time.setSeconds(time.getSeconds() + 300);
        } else if(s === longBreak) {
            time.setSeconds(time.getSeconds() + 900);
        }
        return time;
    }

    //timer
    const {
        seconds,
        minutes,
        hours,
        isRunning,
        pause,
        start,
        resume,
        restart,
    } = useTimer({ expiryTimestamp, autoStart: false, onExpire: () => console.warn('onExpire called') });

    //shehab needs minutes, seconds, hours

    //move the timer forward a session. sets the new session, and resets the timer and expiryTimestamp
    function updateTimer(reset) {
        if(settingsStates.session === pomozone) {
            reset ? null : settingsSetStates.setSession(shortBreak);
            expiryTimestamp = reset ? setTime(pomozone) : setTime(shortBreak);
            reset ? null : settingsSetStates.setTheme(settingsStates.shortBreakTheme);
        } else if(settingsStates.session === shortBreak) {
            reset ? null : settingsSetStates.setSession(longBreak);
            expiryTimestamp = reset ? setTime(shortBreak) : setTime(longBreak);
            reset ? null : settingsSetStates.setTheme(settingsStates.longBreakTheme);
        } else {
            reset ? null : settingsSetStates.setSession(pomozone);
            expiryTimestamp = reset ? setTime(longBreak) : setTime(pomozone);
            reset ? null : settingsSetStates.setTheme(settingsStates.pomozoneTheme);
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
                <h2>{settingsStates.session.replace("-", " ")}</h2>
                <div className="buttons">
                    <button className={`${settingsStates.session}-${settingsStates.theme}`} onClick={() => {updateTimer(true)}}>
                        <img src={resetIcon} alt="restart timer"></img>
                    </button>
                    <button className={`${settingsStates.session}-${settingsStates.theme}`} onClick={isRunning ? pause : resume}>
                        <img src={isRunning ? pauseIcon : startIcon} alt={isRunning ? "pause timer": "start timer"}></img>
                    </button>
                    <button className={`${settingsStates.session}-${settingsStates.theme}`} onClick={() => {updateTimer(false)}}>
                        <img src={forwardIcon} alt="move to next session"></img>
                    </button>
                </div>
            </div>
        </div>
    )
}