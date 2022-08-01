import * as React from "react";
import { useSettingsContext } from "../../contexts/SettingsContext";
import { useAuthContext } from "../../contexts/AuthContext";
import "./Sidebar.css"

export default function Sidebar() {
  const { settingsStates, settingsFunctions } = useSettingsContext();
  const { authFunctions } = useAuthContext();
  return (
    <div className={`sidebar sidebar-${settingsStates.session}-${settingsStates.theme}`}>
      <div className="sidebar-top">
        <i className="logo fa-solid fa-clock"></i>
        <span className="brand">PomoZone</span>
      </div>
      <div className="sidebar-center">
        <ul className="list">
          <li className="list-item" onClick={()=>{authFunctions.handleOnToggle("profile")}}>
            <i className="list-item-icon fa-solid fa-user"></i>
            <span className="list-item-text">Profile</span>
          </li>
          <li className="list-item" onClick={()=>{authFunctions.handleOnToggle("settings")}}>
            <i className="list-item-icon fa-solid fa-sliders"></i>
            <span className="list-item-text">Settings</span>
          </li>
          <li className="list-item" onClick={()=>{authFunctions.handleOnToggle("history")}}>
            <i className="list-item-icon fa-solid fa-face-sad-tear"></i>
            <span className="list-item-text">History</span>
          </li>
          <li className="list-item" onClick={()=>{authFunctions.handleOnToggle("todo")}}>
            <i className="list-item-icon fa-solid fa-list-check"></i>
            <span className="list-item-text">To-Do List</span>
          </li>
        </ul>
      </div>
      <div className="sidebar-bottom">
        <div className="color-box default" onClick={() => settingsFunctions.darkModeButtons("default")}>
          <i className="list-item-icon fa-solid fa-sun"></i>
        </div>
        <div className="color-box dark" onClick={() => settingsFunctions.darkModeButtons("dark")}>
          <i className="list-item-icon fa-solid fa-moon"></i>
        </div>
      </div>
    </div>
  );
}
