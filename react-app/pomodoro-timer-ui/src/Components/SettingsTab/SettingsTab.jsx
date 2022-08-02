import * as React from "react";
import { useSettingsContext } from "../../contexts/SettingsContext";
import Toggle from 'react-toggle';
import "./SettingsTab.css";

export default function SettingsTab() {
    const { settingsStates, settingsSetStates, settingsFunctions } = useSettingsContext();

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
        <div className={`settings-tab ${settingsStates.darkToggle ? "dark" : null}`}>
            <h2>Settings</h2>
            <div className="set-time">
                <h4>Set Times</h4>
                <div className="time-forms">
                    <ul className="input-names">
                        <li>Focus Time {"(in min):"}</li>
                        <li>Short Break Time {"(in min):"}</li>
                        <li>Long Break Time {"(in min):"}</li>
                    </ul>
                    <div className="inputs">
                        <div className="input-field">
                            <input
                                className={`form-input ${settingsStates.darkToggle ? "dark" : null}`}
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
                                className={`form-input ${settingsStates.darkToggle ? "dark" : null}`}
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
                                className={`form-input ${settingsStates.darkToggle ? "dark" : null}`}
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
                        <li>Dark Mode</li>
                        <li>Sound Notifications</li>
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
                </div>
            </div>
        </div>
    )
}