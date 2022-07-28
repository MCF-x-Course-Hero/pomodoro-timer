import * as React from "react";
import { useTimer } from "react-timer-hook";
import apiClient from "../../Services/apiClient";
import resetIcon from "../../Assets/restart.svg";
import darkReset from "../../Assets/dark-restart.svg";
import darkPause from "../../assets/dark-pause.svg";
import darkPlay from "../../assets/dark-play.svg";
import pauseIcon from "../../Assets/pause.svg";
import forwardIcon from "../../Assets/forward.svg";
import darkForward from "../../assets/dark-forward.svg";
import startIcon from "../../Assets/play.svg";
import softNotif from "../../assets/soft-notif.mp3";
import { useSettingsContext } from "../../contexts/SettingsContext";
import { useAuthContext } from "../../contexts/AuthContext";
import useSound from "use-sound";
import "./Timer.css";
import PinnedTodo from "../PinnedTodo/PinnedTodo";

export default function Timer() {
    const { settingsStates, settingsSetStates } = useSettingsContext();
    const { authStates, authSetStates } = useAuthContext();
    let pomozoneTime = (settingsStates.timeForm.focusTime * 60);
    let shortBreakTime = (settingsStates.timeForm.shortBreakTime * 60);
    let longBreakTime = (settingsStates.timeForm.longBreakTime * 60);
    let totalTime = (pomozoneTime * 4) + (shortBreakTime * 3) + (longBreakTime);
    const [loops, setLoops] = React.useState(0);
    const pomozone = "pomozone";
    const shortBreak = "short-break";
    const longBreak = "long-break";

    React.useEffect(() => {
        if(settingsStates.session === pomozone) {
            pomozoneTime = (settingsStates.timeForm.focusTime * 60);
            updateTimer(true);
        } else if(settingsStates.session === shortBreak) {
            shortBreakTime = (settingsStates.timeForm.shortBreakTime * 60);
            updateTimer(true);
        } else if(settingsStates.session === longBreak) {
            longBreakTime = (settingsStates.timeForm.longBreakTime * 60);
            updateTimer(true);
        }
        totalTime = (pomozoneTime * 4) + (shortBreakTime * 3) + (longBreakTime);
    }, [settingsStates.timeForm])

    //expiryTimestamp tells the timer how long the timer should run for
    let expiryTimestamp = setTime(settingsStates.session);
    const [playActive] = useSound(softNotif, {volume: 2 });

    function finishCountdown() {
        settingsStates.notifToggle ? playActive() : null;
        settingsSetStates.setIsExploding(true);
        setTimeout( async () => {
            settingsSetStates.setIsExploding(false);
            if(loops == 3 && settingsStates.session == pomozone) {
                settingsSetStates.setTheme(settingsStates.longBreakTheme);
                settingsSetStates.setSession(longBreak);
                expiryTimestamp = setTime(longBreak);
            } else if (settingsStates.session == shortBreak) {
                settingsSetStates.setTheme(settingsStates.pomozoneTheme);
                settingsSetStates.setSession(pomozone);
                expiryTimestamp = setTime(pomozone);
                setLoops(loops + 1);
            } else if(settingsStates.session === longBreak) {
                if(authStates.loggedIn) {
                    const { data, error } = await apiClient.addSession({session_type: "PomoZone", duration: totalTime });
                    if (error) {
                        authSetStates.setError((e) => ({ ...e, form: error }));
                    } else if (data?.session) {
                        console.log("we did it boys");
                    }
                }
                settingsSetStates.setTheme(settingsStates.pomozoneTheme);
                settingsSetStates.setSession(pomozone);
                expiryTimestamp = setTime(pomozone);
                setLoops(0);
            } else if(settingsStates.session == pomozone) {
                settingsSetStates.setTheme(settingsStates.shortBreakTheme);
                settingsSetStates.setSession(shortBreak);
                expiryTimestamp = setTime(shortBreak);
            }
            console.log(pomozoneTime, "p");
            console.log(shortBreakTime, "s");
            console.log(longBreakTime, "l");
            restart(expiryTimestamp, true);
        }, 2000);
    }

    function setTime(s) {
        const time = new Date();
        if(s === pomozone) {
            time.setSeconds(time.getSeconds() + 3);
            console.log("settings current time to" + pomozoneTime);
        } else if(s === shortBreak) {
            time.setSeconds(time.getSeconds() + 3);
        } else if(s === longBreak) {
            time.setSeconds(time.getSeconds() + 3);
        }
        return time;
    }

    //timer
    const { seconds, minutes, hours, days, isRunning, pause, start, resume, restart
    } = useTimer({ expiryTimestamp, autoStart: false, onExpire: finishCountdown });

    //move the timer forward a session. sets the new session, and resets the timer and expiryTimestamp
    function updateTimer(reset) {
        settingsSetStates.setIsExploding(false);
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
                <PinnedTodo />
                <div className="timer-area">
                    <div className={`time-${settingsStates.darkToggle ? "dark" : "reg"}`}>
                        {/* {days ? (<span>{days}:</span>) : null} */}
                        {hours ? (<span>{hours}:</span>) : null }
                        <span>{(minutes < 10 && hours) ? '0' + minutes : minutes}</span>
                        <span>:{(seconds < 10) ? '0' + seconds : seconds}</span>
                    </div>
                <h2 className={`session-${settingsStates.darkToggle ? "dark" : "reg"}`}>
                    {settingsStates.session.replace("-", " ")}
                </h2>
                <div className="buttons">
                    <button className={`${settingsStates.session}-${settingsStates.theme}`} onClick={() => {updateTimer(true)}}>
                        <img src={settingsStates.darkToggle ? darkReset : resetIcon} alt="restart timer"></img>
                    </button>
                    <button className={`${settingsStates.session}-${settingsStates.theme}`} onClick={isRunning ? pause : resume}>
                        <img src={isRunning ? (settingsStates.darkToggle ? darkPause : pauseIcon) : (settingsStates.darkToggle ? darkPlay : startIcon) } alt={isRunning ? "pause timer": "start timer"}></img>
                    </button>
                    <button className={`${settingsStates.session}-${settingsStates.theme}`} onClick={() => {updateTimer(false)}}>
                        <img src={settingsStates.darkToggle ? darkForward : forwardIcon} alt="move to next session"></img>
                    </button>
                </div>
                </div>
            </div>
        </div>
    )
}