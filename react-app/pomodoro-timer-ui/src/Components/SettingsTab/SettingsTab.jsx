import * as React from "react";
import typewriter from "../../assets/typewriter.mp3";
import dingdong from "../../assets/dingdong.mp3";
import bikebell from "../../assets/bike-notif.mp3";
import standard from "../../assets/attention.mp3";
import achievement from "../../assets/achievement.mp3";
import { useSettingsContext } from "../../contexts/SettingsContext";
import { useAuthContext } from "../../contexts/AuthContext";
import useSound from "use-sound";
import Toggle from 'react-toggle';
import "./SettingsTab.css";

export default function SettingsTab() {
    const { settingsStates, settingsSetStates, settingsFunctions } = useSettingsContext();
    const { authStates } = useAuthContext();
    const [playTypewriter] = useSound(typewriter, {volume: 2, format: 'mp3' });
    const [playAchievement] = useSound(achievement, {volume: 2, format: 'mp3' });
    const [playBikebell] = useSound(bikebell, {volume: 2, format: 'mp3' });
    const [playDingdog] = useSound(dingdong, {volume: 2, format: 'mp3' });
    const [playStandard] = useSound(standard, {volume: 2, format: 'mp3' });

    const handleOnInputChange = (e) => {
        if (e.target.value >= 0) {
            settingsSetStates.setTimeForm((f) => ({ ...f, [e.target.name]: e.target.value}));
        }
    }

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

    const handleNotifChange = (e) => {
        if(!settingsStates.notifToggle) {
            settingsSetStates.setNotifToggle(true);
        }
        if(e.target.value == "typewriter") {
            settingsSetStates.setNotifSound(typewriter);
        }
        if(e.target.value == "achievement") {
            settingsSetStates.setNotifSound(achievement);
        }
        if(e.target.value == "standard") {
            settingsSetStates.setNotifSound(standard);
        }
        if(e.target.value == "bike") {
            settingsSetStates.setNotifSound(bikebell);
        }
        if(e.target.value == "doorbell") {
            settingsSetStates.setNotifSound(dingdong);
        }
    }

    function colorPalette(color) {
        if(settingsStates.session === "pomozone") {
            settingsSetStates.setPomozoneTheme(color);
            settingsSetStates.setTheme(color);
            if(settingsStates.darkToggle) settingsSetStates.setDarkToggle(false);
        } else if(settingsStates.session === "short-break") {
            settingsSetStates.setShortBreakTheme(color);
            settingsSetStates.setTheme(color);
            if(settingsStates.darkToggle) settingsSetStates.setDarkToggle(false);
        } else if(settingsStates.session === "long-break") {
            settingsSetStates.setLongBreakTheme(color);
            settingsSetStates.setTheme(color);
            if(settingsStates.darkToggle) settingsSetStates.setDarkToggle(false);
        }
    }
    return(
        <div className="settings-tab">
            <h2>Settings</h2>
            <div className="set-time">
                <h4>Timer Options</h4>
                <div className="time-forms">
                    <ul className="input-names">
                        <li>PomoZone Time {"(in minutes):"}</li>
                        <li>Short Break Time {"(in minutes):"}</li>
                        <li>Long Break Time {"(in minutes):"}</li>
                        <li>Num. of Sessions before Long Break:</li>
                        <li className="auto-toggle">Automatically Move to Next Session:</li>
                    </ul>
                    <div className="inputs">
                        <div className="input-field">
                            <input
                                className="input-form"
                                type="number"
                                name="focusTime"
                                placeholder="25"
                                value={settingsStates.timeForm.focusTime}
                                onChange={handleOnInputChange}
                                onKeyDown={ (evt) => {
                                    evt.key === 'e' && evt.preventDefault();
                                    evt.key === '-' && evt.preventDefault();
                                    evt.key === '.' && evt.preventDefault();
                                }}
                                min="0"
                            />
                        </div>
                        <div className="input-field">
                            <input
                                className="input-form"
                                type="number"
                                name="shortBreakTime"
                                placeholder="5"
                                value={settingsStates.timeForm.shortBreakTime}
                                onChange={handleOnInputChange}
                                onKeyDown={ (evt) => {
                                    evt.key === 'e' && evt.preventDefault();
                                    evt.key === '-' && evt.preventDefault();
                                    evt.key === '.' && evt.preventDefault();
                                }}
                                min="0"
                            />
                        </div>
                        <div className="input-field">
                            <input
                                className="input-form"
                                type="number"
                                name="longBreakTime"
                                placeholder="15"
                                value={settingsStates.timeForm.longBreakTime}
                                onChange={handleOnInputChange}
                                onKeyDown={ (evt) => {
                                    evt.key === 'e' && evt.preventDefault();
                                    evt.key === '-' && evt.preventDefault();
                                    evt.key === '.' && evt.preventDefault();
                                }}
                                min="0"
                            />
                        </div>
                        <div className="input-field">
                            <select className="session-num" onChange={(evt) => {settingsSetStates.setNumSessions(evt.target.value)}} defaultValue={settingsStates.numSessions}>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                            </select>
                        </div>
                        <div className="time-toggle">
                            <Toggle
                                defaultChecked={settingsStates.automaticTimer}
                                onChange={() => {settingsSetStates.setAutomaticTimer(!settingsStates.automaticTimer)}}
                                icons={false}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="color-themes">
                <h4>Color Options</h4>
                <div className="content">
                    <div className="color-palette">
                        <span className="dot pdefault" onClick={() => {colorPalette("pdefault")}}></span>
                        <span className="dot sbdefault" onClick={() => {colorPalette("sbdefault")}}></span>
                        <span className="dot lbdefault" onClick={() => {colorPalette("lbdefault")}}></span>
                        <span className="dot turquoise" onClick={() => {colorPalette("turquoise")}}></span>
                        <span className="dot teal" onClick={() => {colorPalette("teal")}}></span>
                        <span className="dot green" onClick={() => {colorPalette("green")}}></span>
                        <span className="dot light-green" onClick={() => {colorPalette("light-green")}}></span>
                        <span className="dot pink" onClick={() => {colorPalette("pink")}}></span>
                        <span className="dot red" onClick={() => {colorPalette("red")}}></span>
                        <span className="dot orange" onClick={() => {colorPalette("orange")}}></span>
                    </div>
                    <div className="dark-area">
                        <p>Toggle Dark Mode:</p>
                        <Toggle
                            checked={settingsStates.darkToggle}
                            onChange={() => { settingsFunctions.darkModeToggle() }}
                            icons={false}
                        />
                    </div>
                </div>
            </div>
            <h4 className="toggle-header">Notification Options</h4>
            <div className="notif-area">                
                <div className="notif-names">
                    <p>Toggle Notifications:</p>
                    <p>Choose Notification Sound:</p>
                </div>
                <div className="notifs">
                    <label>
                        <Toggle
                            checked={settingsStates.notifToggle}
                            onChange={() => {settingsSetStates.setNotifToggle(!settingsStates.notifToggle)}}
                            icons={false}
                        />
                    </label>
                    <div className="ding">
                        <select className="notif-sound" onChange={handleNotifChange} defaultValue={settingsStates.notifSound}>
                            <option value={"standard"}>Standard</option>
                            <option value={"achievement"}>Achievement</option>
                            <option value={"bike"}>Bike Bell</option>
                            <option value={"typewriter"}>Typewriter</option>
                            <option value={"doorbell"}>Doorbell Ring</option>
                        </select>
                        <i className="fa-solid fa-volume-high" onClick={playSound}></i>
                    </div>
                </div>
            </div>
            { authStates.loggedIn ? 
                (<div className="update-settings">
                    <button onClick={settingsFunctions.updateDefaultSettings} disabled={settingsStates.loading}>Revert to Default</button>
                    <button onClick={settingsFunctions.updateUserSettings} disabled={settingsStates.loading}>Apply Changes</button>
                </div>) : (null)}
                <p className={settingsStates.fadeProp.fade}>Your settings have been saved</p>
                <p className={settingsStates.fadeProp.fadeError}>Oh no! Something went wrong</p>
        </div>
    )
}