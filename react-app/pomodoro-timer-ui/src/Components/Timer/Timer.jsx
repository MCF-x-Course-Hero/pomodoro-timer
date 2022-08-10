import * as React from "react";
import { useTimer } from "react-timer-hook";
import typewriter from "../../assets/typewriter.mp3";
import dingdong from "../../assets/dingdong.mp3";
import bikebell from "../../assets/bike-notif.mp3";
import standard from "../../assets/attention.mp3";
import achievement from "../../assets/achievement.mp3";
import apiClient from "../../Services/apiClient";
import resetIcon from "../../assets/restart.svg";
import pauseIcon from "../../assets/pause.svg";
import forwardIcon from "../../assets/forward.svg";
import startIcon from "../../assets/play.svg";
import { useSettingsContext } from "../../contexts/SettingsContext";
import { useAuthContext } from "../../contexts/AuthContext";
import useSound from "use-sound";
import "./Timer.css";

export default function Timer() {
    const { settingsStates, settingsSetStates } = useSettingsContext();
    const { authStates, authSetStates } = useAuthContext();
    let pomozoneTime = (settingsStates.timeForm.focusTime * 60);
    let shortBreakTime = (settingsStates.timeForm.shortBreakTime * 60);
    let longBreakTime = (settingsStates.timeForm.longBreakTime * 60);
    const [playTypewriter] = useSound(typewriter, {volume: 2, format: 'mp3' });
    const [playAchievement] = useSound(achievement, {volume: 2, format: 'mp3' });
    const [playBikebell] = useSound(bikebell, {volume: 2, format: 'mp3' });
    const [playDingdog] = useSound(dingdong, {volume: 2, format: 'mp3' });
    const [playStandard] = useSound(standard, {volume: 2, format: 'mp3' });
    const [loops, setLoops] = React.useState(1);
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
    }, [settingsStates.timeForm])

    function playSound() {
        if(settingsStates.notifSound === typewriter || settingsStates.notifSound === "typewriter") {
            playTypewriter();
        }
        if(settingsStates.notifSound === achievement || settingsStates.notifSound === "achievement") {
            playAchievement();
        }
        if(settingsStates.notifSound === standard || settingsStates.notifSound === "standard") {
            playStandard();
        }
        if(settingsStates.notifSound === bikebell || settingsStates.notifSound === "bike") {
            playBikebell();
        }
        if(settingsStates.notifSound === dingdong || settingsStates.notifSound === "doorbell") {
           playDingdog();
        }
    }

    //expiryTimestamp tells the timer how long the timer should run for
    let expiryTimestamp = setTime(settingsStates.session);

    function finishCountdown() {
        settingsStates.notifToggle ? playSound() : null;
        settingsStates.confetti ? settingsSetStates.setIsExploding(true) : null;
        setTimeout( async () => {
            settingsSetStates.setIsExploding(false);
            if (settingsStates.session == shortBreak) {
                settingsSetStates.setTheme(settingsStates.pomozoneTheme);
                settingsSetStates.setSession(pomozone);
                expiryTimestamp = setTime(pomozone);
                setLoops(loops + 1);
            } else if(settingsStates.session === longBreak) {
                settingsSetStates.setTheme(settingsStates.pomozoneTheme);
                settingsSetStates.setSession(pomozone);
                expiryTimestamp = setTime(pomozone);
                setLoops(1);
            } else if(settingsStates.session == pomozone) {
                if(authStates.loggedIn) {
                    const { data, error } = await apiClient.addSession({session_type: "PomoZone", duration: pomozoneTime });
                    if (error) {
                        authSetStates.setError((e) => ({ ...e, form: error }));
                    }
                }
                if(loops == settingsStates.numSessions) {
                    settingsSetStates.setTheme(settingsStates.longBreakTheme);
                    settingsSetStates.setSession(longBreak);
                    expiryTimestamp = setTime(longBreak);
                } else {
                    settingsSetStates.setTheme(settingsStates.shortBreakTheme);
                    settingsSetStates.setSession(shortBreak);
                    expiryTimestamp = setTime(shortBreak);
                }
            }
            restart(expiryTimestamp, settingsStates.automaticTimer);
        }, settingsStates.confetti ? 5000 : 2000);
    }

    function setTime(s) {
        const time = new Date();
        if(s === pomozone) {
            time.setSeconds(time.getSeconds() + pomozoneTime);
        } else if(s === shortBreak) {
            time.setSeconds(time.getSeconds() + shortBreakTime);
        } else if(s === longBreak) {
            time.setSeconds(time.getSeconds() + longBreakTime);
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
                <div className="timer-area">
                    <div className={`time-${settingsStates.darkToggle ? "dark" : "reg"}`}>
                        {/* {days ? (<span>{days}:</span>) : null} */}
                        {hours ? (<span>{hours}:</span>) : null }
                        <span>{(minutes < 10 && hours) ? '0' + minutes : minutes}</span>
                        <span>:{(seconds < 10) ? '0' + seconds : seconds}</span>
                    </div>
                <h2 className={`session-${settingsStates.darkToggle ? "dark" : "reg"}`}>
                    {`${settingsStates.session.replace("-", " ")} ${settingsStates.session == "pomozone" ? loops : ""}`}
                </h2>
                <div className="buttons">
                    <button className={`${settingsStates.darkToggle ? `${settingsStates.session}-dark-mode` : `${settingsStates.session}-${settingsStates.theme}`}`} onClick={() => {updateTimer(true)}}>
                        <img src={resetIcon} alt="restart timer"></img>
                    </button>
                    <button className={`${settingsStates.darkToggle ? `${settingsStates.session}-dark-mode` : `${settingsStates.session}-${settingsStates.theme}`}`} onClick={isRunning ? pause : resume}>
                        <img src={isRunning ? (pauseIcon) : (startIcon) } alt={isRunning ? "pause timer": "start timer"}></img>
                    </button>
                    <button className={`${settingsStates.darkToggle ? `${settingsStates.session}-dark-mode` : `${settingsStates.session}-${settingsStates.theme}`}`} onClick={() => {updateTimer(false)}}>
                        <img src={forwardIcon} alt="move to next session"></img>
                    </button>
                </div>
                </div>
            </div>
        </div>
    )
}