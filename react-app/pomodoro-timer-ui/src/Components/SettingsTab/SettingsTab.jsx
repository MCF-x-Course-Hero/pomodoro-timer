import * as React from "react";
import { useSettingsContext } from "../../contexts/SettingsContext";
import Toggle from 'react-toggle';
import "./SettingsTab.css";

export default function SettingsTab() {
    const { settingsStates, settingsSetStates, settingsFunctions } = useSettingsContext();

    function pomozoneColorPalette(color) {
        settingsSetStates.setPomozoneTheme(color);
        settingsSetStates.setTheme(color);
        if(settingsStates.darkToggle) {
            settingsSetStates.setDarkToggle(!settingsStates.darkToggle);
        }
    }

    function shortBreakColorPalette(color) {
        settingsSetStates.setPomozoneTheme(color);
        settingsSetStates.setTheme(color);
        if(settingsStates.darkToggle) {
            settingsSetStates.setDarkToggle(!settingsStates.darkToggle);
        }
    }

    function longBreakColorPalette(color) {
        settingsSetStates.setPomozoneTheme(color);
        settingsSetStates.setTheme(color);
        if(settingsStates.darkToggle) {
            settingsSetStates.setDarkToggle(!settingsStates.darkToggle);
        }
    }

    return(
        <div className={`settings-tab ${settingsStates.darkToggle ? "dark" : null}`}>
            <h2>Settings</h2>
            <div className="set-time">
                <div className="time-names">
                    <ul>
                        <li>Focus Time</li>
                        <li>Short Break Time</li>
                        <li>Long Break Time</li>
                    </ul>
                </div>
                <div className="time-forms">
                    <ul>
                        <li>__:__</li>
                        <li>__:__</li>
                        <li>__:__</li>
                    </ul>
                </div>
            </div>
            <div className="color-themes">
                <h4>Color Themes</h4>
                { settingsStates.session === "pomozone" ? (
                    <div className="color-palette">
                        <span className="dot pdefault" onClick={() => {pomozoneColorPalette("pdefault")}}></span>
                        <span className="dot sbdefault" onClick={() => {pomozoneColorPalette("sbdefault")}}></span>
                        <span className="dot lbdefault" onClick={() => {pomozoneColorPalette("lbdefault")}}></span>
                        <span className="dot turquoise" onClick={() => {pomozoneColorPalette("turquoise")}}></span>
                        <span className="dot teal" onClick={() => {pomozoneColorPalette("teal")}}></span>
                        <span className="dot green" onClick={() => {pomozoneColorPalette("green")}}></span>
                        <span className="dot light-green" onClick={() => {pomozoneColorPalette("light-green")}}></span>
                        <span className="dot pink" onClick={() => {pomozoneColorPalette("pink")}}></span>
                        <span className="dot red" onClick={() => {pomozoneColorPalette("red")}}></span>
                        <span className="dot orange" onClick={() => {pomozoneColorPalette("orange")}}></span>
                    </div>
                ) : (null) }
                { settingsStates.session === "short-break" ? (
                    <div className="color-palette">
                        <span className="dot pdefault" onClick={() => {shortBreakColorPalette("pdefault")}}></span>
                        <span className="dot sbdefault" onClick={() => {shortBreakColorPalette("sbdefault")}}></span>
                        <span className="dot lbdefault" onClick={() => {shortBreakColorPalette("lbdefault")}}></span>
                        <span className="dot turquoise" onClick={() => {shortBreakColorPalette("turquoise")}}></span>
                        <span className="dot teal" onClick={() => {shortBreakColorPalette("teal")}}></span>
                        <span className="dot green" onClick={() => {shortBreakColorPalette("green")}}></span>
                        <span className="dot light-green" onClick={() => {shortBreakColorPalette("light-green")}}></span>
                        <span className="dot pink" onClick={() => {shortBreakColorPalette("pink")}}></span>
                        <span className="dot red" onClick={() => {shortBreakColorPalette("red")}}></span>
                        <span className="dot orange" onClick={() => {shortBreakColorPalette("orange")}}></span>
                    </div>
                ) : (null) }
                { settingsStates.session === "long-break" ? (
                    <div className="color-palette">
                        <span className="dot pdefault" onClick={() => {longBreakColorPalette("pdefault")}}></span>
                        <span className="dot sbdefault" onClick={() => {longBreakColorPalette("sbdefault")}}></span>
                        <span className="dot lbdefault" onClick={() => {longBreakColorPalette("lbdefault")}}></span>
                        <span className="dot turquoise" onClick={() => {longBreakColorPalette("turquoise")}}></span>
                        <span className="dot teal" onClick={() => {longBreakColorPalette("teal")}}></span>
                        <span className="dot green" onClick={() => {longBreakColorPalette("green")}}></span>
                        <span className="dot light-green" onClick={() => {longBreakColorPalette("light-green")}}></span>
                        <span className="dot pink" onClick={() => {longBreakColorPalette("pink")}}></span>
                        <span className="dot red" onClick={() => {longBreakColorPalette("red")}}></span>
                        <span className="dot orange" onClick={() => {longBreakColorPalette("orange")}}></span>
                    </div>
                ) : (null) }
            </div>
            <div className="slider-area">
                <div className="slider-names">
                    <ul>
                        <li>Dark Mode</li>
                        <li>Display Notifications</li>
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