import * as React from "react";
import { useSettingsContext } from "../../contexts/SettingsContext";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import "./SettingsTab.css";

export default function SettingsTab() {
    const { settingsStates, settingsSetStates } = useSettingsContext();
    return(
        <div className="settings-tab">
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
                        <span className="dot pdefault" onClick={() => {settingsSetStates.setPomozoneTheme("pdefault"); settingsSetStates.setTheme("pdefault") }}></span>
                        <span className="dot sbdefault" onClick={() => {settingsSetStates.setPomozoneTheme("sbdefault"); settingsSetStates.setTheme("sbdefault") }}></span>
                        <span className="dot lbdefault" onClick={() => {settingsSetStates.setPomozoneTheme("lbdefault"); settingsSetStates.setTheme("lbdefault") }}></span>
                        <span className="dot turquoise" onClick={() => {settingsSetStates.setPomozoneTheme("turquoise"); settingsSetStates.setTheme("turquoise") }}></span>
                        <span className="dot teal" onClick={() => {settingsSetStates.setPomozoneTheme("teal"); settingsSetStates.setTheme("teal") }}></span>
                        <span className="dot green" onClick={() => {settingsSetStates.setPomozoneTheme("green"); settingsSetStates.setTheme("green") }}></span>
                        <span className="dot light-green" onClick={() => {settingsSetStates.setPomozoneTheme("light-green"); settingsSetStates.setTheme("light-green") }}></span>
                        <span className="dot pink" onClick={() => {settingsSetStates.setPomozoneTheme("pink"); settingsSetStates.setTheme("pink") }}></span>
                        <span className="dot red" onClick={() => {settingsSetStates.setPomozoneTheme("red"); settingsSetStates.setTheme("red")}}></span>
                        <span className="dot orange" onClick={() => {settingsSetStates.setPomozoneTheme("orange"); settingsSetStates.setTheme("orange") }}></span>
                    </div>
                ) : (null) }
                { settingsStates.session === "short-break" ? (
                    <div className="color-palette">
                        <span className="dot pdefault" onClick={() => {settingsSetStates.setShortBreakTheme("pdefault"); settingsSetStates.setTheme("pdefault") }}></span>
                        <span className="dot sbdefault" onClick={() => {settingsSetStates.setShortBreakTheme("sbdefault"); settingsSetStates.setTheme("sbdefault") }}></span>
                        <span className="dot lbdefault" onClick={() => {settingsSetStates.setShortBreakTheme("lbdefault"); settingsSetStates.setTheme("lbdefault") }}></span>
                        <span className="dot turquoise" onClick={() => {settingsSetStates.setShortBreakTheme("turquoise"); settingsSetStates.setTheme("turquoise") }}></span>
                        <span className="dot teal" onClick={() => {settingsSetStates.setShortBreakTheme("teal"); settingsSetStates.setTheme("teal") }}></span>
                        <span className="dot green" onClick={() => {settingsSetStates.setShortBreakTheme("green"); settingsSetStates.setTheme("green") }}></span>
                        <span className="dot light-green" onClick={() => {settingsSetStates.setShortBreakTheme("light-green"); settingsSetStates.setTheme("light-green") }}></span>
                        <span className="dot pink" onClick={() => {settingsSetStates.setShortBreakTheme("pink"); settingsSetStates.setTheme("pink") }}></span>
                        <span className="dot red" onClick={() => {settingsSetStates.setShortBreakTheme("red"); settingsSetStates.setTheme("red")}}></span>
                        <span className="dot orange" onClick={() => {settingsSetStates.setShortBreakTheme("orange"); settingsSetStates.setTheme("orange") }}></span>
                    </div>
                ) : (null) }
                { settingsStates.session === "long-break" ? (
                    <div className="color-palette">
                        <span className="dot pdefault" onClick={() => {settingsSetStates.setLongBreakTheme("pdefault"); settingsSetStates.setTheme("pdefault") }}></span>
                        <span className="dot sbdefault" onClick={() => {settingsSetStates.setLongBreakTheme("sbdefault"); settingsSetStates.setTheme("sbdefault") }}></span>
                        <span className="dot lbdefault" onClick={() => {settingsSetStates.setLongBreakTheme("lbdefault"); settingsSetStates.setTheme("lbdefault") }}></span>
                        <span className="dot turquoise" onClick={() => {settingsSetStates.setLongBreakTheme("turquoise"); settingsSetStates.setTheme("turquoise") }}></span>
                        <span className="dot teal" onClick={() => {settingsSetStates.setLongBreakTheme("teal"); settingsSetStates.setTheme("teal") }}></span>
                        <span className="dot green" onClick={() => {settingsSetStates.setLongBreakTheme("green"); settingsSetStates.setTheme("green") }}></span>
                        <span className="dot light-green" onClick={() => {settingsSetStates.setLongBreakTheme("light-green"); settingsSetStates.setTheme("light-green") }}></span>
                        <span className="dot pink" onClick={() => {settingsSetStates.setLongBreakTheme("pink"); settingsSetStates.setTheme("pink") }}></span>
                        <span className="dot red" onClick={() => {settingsSetStates.setLongBreakTheme("red"); settingsSetStates.setTheme("red")}}></span>
                        <span className="dot orange" onClick={() => {settingsSetStates.setLongBreakTheme("orange"); settingsSetStates.setTheme("orange") }}></span>
                    </div>
                ) : (null) }
            </div>
            <div className="slider-area">
                <div className="slider-names">
                    <ul>
                        <li>Display Notifications</li>
                        <li>Dark Mode</li>
                    </ul>
                </div>
                <div className="sliders">
                    <ul>
                        <ToggleSwitch label="notif" />
                        <ToggleSwitch label="darkmode" />
                    </ul>
                </div>
            </div>
        </div>
    )
}