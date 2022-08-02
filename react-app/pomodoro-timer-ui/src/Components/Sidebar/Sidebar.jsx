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
          <li className="list-item" onClick={()=>{authFunctions.handleOnToggle("todo")}}>
            <i className="list-item-icon fa-solid fa-list-check"></i>
            <span className="list-item-text">To-Do List</span>
          </li>
          <li className="list-item" onClick={()=>{authFunctions.handleOnToggle("history")}}>
            <i className="list-item-icon fa-regular fa-calendar"></i>
            <span className="list-item-text">History</span>
          </li>
          <li className="list-item" onClick={()=>{authFunctions.handleOnToggle("settings")}}>
            <i className="list-item-icon fa-solid fa-gears"></i>
            <span className="list-item-text">Settings</span>
          </li>
        </ul>
      </div>
      <div className="sidebar-bottom">
        <ul>
          <li onClick={() => settingsFunctions.darkModeButtons("default")}>
            <i className="list-item-icon fa-solid fa-sun"></i>
          </li>
          <li onClick={() => settingsFunctions.darkModeButtons("dark")}>
            <i className="list-item-icon fa-solid fa-moon"></i>
          </li>
        </ul>
      </div>
    </div>
  );
}
