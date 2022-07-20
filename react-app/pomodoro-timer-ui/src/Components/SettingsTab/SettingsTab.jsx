import * as React from "react";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import "./SettingsTab.css";

export default function SettingsTab() {
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
                <div className="color-palette">
                    <span className="dot0" onClick={null}></span>
                    <span className="dot1" onClick={null}></span>
                    <span className="dot2" onClick={null}></span>
                    <span className="dot3" onClick={null}></span>
                    <span className="dot4" onClick={null}></span>
                    <span className="dot5" onClick={null}></span>
                    <span className="dot6" onClick={null}></span>
                    <span className="dot7" onClick={null}></span>
                    <span className="dot8" onClick={null}></span>
                    <span className="dot9" onClick={null}></span>
                </div>
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