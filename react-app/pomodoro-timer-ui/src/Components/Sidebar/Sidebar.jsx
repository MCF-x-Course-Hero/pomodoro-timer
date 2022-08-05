import * as React from "react";
import classnames from "classnames";
import { useSettingsContext } from "../../contexts/SettingsContext";
import { useAuthContext } from "../../contexts/AuthContext";
import "./Sidebar.css"

export default function Sidebar() {
  const { settingsStates, settingsFunctions } = useSettingsContext();
  const { authFunctions, authSetStates, authStates } = useAuthContext();
  return (
    <div className={`sidebar ${settingsStates.session}-${settingsStates.theme}`}>
      <div className="sidebar-top">
        <i className="logo fa-solid fa-clock"></i>
        <span className="brand">PomoZone</span>
      </div>
      <div className="sidebar-center">
        <ul className="list">
          <li className={classnames("list-item", `${settingsStates.session}-${settingsStates.theme}`, {active : authStates.active === "profile"})} id="profile" onClick={()=>{authFunctions.handleOnToggle("profile"); authSetStates.setActive(authStates.active === "profile" ? "" : "profile")}}>
            <i className="list-item-icon fa-solid fa-user"></i>
            <span className="list-item-text">Profile</span>
          </li>
          <li className={classnames("list-item", `${settingsStates.session}-${settingsStates.theme}`, {active : authStates.active === "todo"})} id="todo" onClick={()=>{authFunctions.handleOnToggle("todo"); authSetStates.setActive(authStates.active === "todo" ? "" : "todo")}}>
            <i className="list-item-icon fa-solid fa-list-check"></i>
            <span className="list-item-text">To-Do List</span>
          </li>
          <li className={classnames("list-item", `${settingsStates.session}-${settingsStates.theme}`, {active : authStates.active === "history"})} id="history" onClick={()=>{authFunctions.handleOnToggle("history"); authSetStates.setActive(authStates.active === "history" ? "" : "history")}}>
            <i className="list-item-icon fa-regular fa-calendar"></i>
            <span className="list-item-text">History</span>
          </li>
          <li className={classnames("list-item", `${settingsStates.session}-${settingsStates.theme}`, {active : authStates.active === "music"})} id="music" onClick={()=>{authFunctions.handleOnToggle("music"); authSetStates.setActive(authStates.active === "music" ? "" : "music")}}>
            <i className="list-item-icon fa-solid fa-headphones-simple"></i>
            <span className="list-item-text">Music</span>
          </li>
          <li className={classnames("list-item", `${settingsStates.session}-${settingsStates.theme}`, {active : authStates.active === "settings"})} id="settings" onClick={()=>{authFunctions.handleOnToggle("settings"); authSetStates.setActive(authStates.active === "settings" ? "" : "settings")}}>
            <i className="list-item-icon fa-solid fa-gears"></i>
            <span className="list-item-text">Settings</span>
          </li>
          <li className={classnames("list-item", `${settingsStates.session}-${settingsStates.theme}`, {active : authStates.active === "about"})} id="about" onClick={()=>{authFunctions.handleOnToggle("about"); authSetStates.setActive(authStates.active === "about" ? "" : "about")}}>
            <i className="list-item-icon fa-solid fa-circle-info"></i>
            <span className="list-item-text">About</span>
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
