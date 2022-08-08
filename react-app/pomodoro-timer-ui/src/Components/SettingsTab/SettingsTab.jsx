import * as React from "react";
import { useSettingsContext } from "../../contexts/SettingsContext";
import { useAuthContext } from "../../contexts/AuthContext";
import Toggle from 'react-toggle';
import "./SettingsTab.css";

export default function SettingsTab() {
    const { settingsStates, settingsSetStates, settingsFunctions } = useSettingsContext();
    const { authStates } = useAuthContext();

    const handleOnInputChange = (e) => {
        if (e.target.value >= 0) {
            settingsSetStates.setTimeForm((f) => ({ ...f, [e.target.name]: e.target.value}));
        }
    }

    function colorPalette(color) {
        if(settingsStates.session === "pomozone") {
            settingsSetStates.setPomozoneTheme(color);
            settingsSetStates.setTheme(color);
            if(settingsStates.darkToggle) {
                settingsSetStates.setDarkToggle(!settingsStates.darkToggle);
                settingsSetStates.setShortBreakTheme("sbdefault");
                settingsSetStates.setLongBreakTheme("lbdefault");
            }
        } else if(settingsStates.session === "short-break") {
            settingsSetStates.setShortBreakTheme(color);
            settingsSetStates.setTheme(color);
            if(settingsStates.darkToggle) {
                settingsSetStates.setDarkToggle(!settingsStates.darkToggle);
                settingsSetStates.setPomozoneTheme("pdefault");
                settingsSetStates.setLongBreakTheme("lbdefault");
            }
        } else if(settingsStates.session === "long-break") {
            settingsSetStates.setLongBreakTheme(color);
            settingsSetStates.setTheme(color);
            if(settingsStates.darkToggle) {
                settingsSetStates.setDarkToggle(!settingsStates.darkToggle);
                settingsSetStates.setPomozoneTheme("pdefault");
                settingsSetStates.setShortBreakTheme("sbdefault");
            }
        }
    }
    return(
        <div className="settings-tab">
            <h2>Settings</h2>
            <div className="set-time">
                <h4>Set Times</h4>
                <div className="time-forms">
                    <ul className="input-names">
                        <li>PomoZone Time {"(in min):"}</li>
                        <li>Short Break Time {"(in min):"}</li>
                        <li>Long Break Time {"(in min):"}</li>
                        <li>Number of Sessions before Long Break:</li>
                    </ul>
                    <div className="inputs">
                        <div className="input-field">
                            <input
                                className="input-form"
                                type="number"
                                name="focusTime"
                                placeholder="1"
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
                                placeholder="80"
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
                                placeholder="25"
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

                    </div>
                </div>
            </div>
            <div className="color-themes">
                <h4>Color Themes</h4>
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
            </div>
            <h4 className="toggle-header">Toggle Options</h4>
            <div className="slider-area">                
                <div className="slider-names">
                    <ul>
                        <li>Dark Mode:</li>
                        <li>Sound Notifications:</li>
                        <li className="auto-toggle">Automatically Move to Next Session:</li>
                    </ul>
                </div>
                <div className="sliders">
                    <label>
                        <Toggle
                            checked={settingsStates.darkToggle}
                            onChange={() => { settingsFunctions.darkModeToggle() }}
                            icons={false}
                        />
                    </label>
                    <label>
                        <Toggle
                            defaultChecked={settingsStates.notifToggle}
                            onChange={() => {settingsSetStates.setNotifToggle(!settingsStates.notifToggle)}}
                            icons={false}
                        />
                    </label>
                    <label>
                        <Toggle
                            defaultChecked={settingsStates.automaticTimer}
                            onChange={() => {settingsSetStates.setAutomaticTimer(!settingsStates.automaticTimer)}}
                            icons={false}
                        />
                    </label>
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