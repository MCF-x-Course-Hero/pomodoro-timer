import * as React from "react";
import "./SidebarExpanded.css";
import { useAuthContext } from "../../contexts/AuthContext";
import LoginForm from "../LoginForm/LoginForm";
import RegisterForm from "../RegisterForm/RegisterForm";
import SettingsTab from "../SettingsTab/SettingsTab";
import HistoryTab from "../HistoryTab/HistoryTab";
import TodoTab from "../TodoTab/TodoTab";
import ProfileTab from "../ProfileTab/ProfileTab";

export default function SidebarExpanded({handleOnToggle, componentName}) {
  const { authStates } = useAuthContext();

  return (
    <section className="sidebar-expanded">
      <div className="side-nav" id="side-menu">
        <a href="#" className="btn-close" onClick={handleOnToggle}>
          &times;
        </a>
        { ("profile"==componentName && !authStates.loggedIn && authStates.login) ? <LoginForm /> : null}
        { ("profile"==componentName && !authStates.loggedIn && authStates.register) ? <RegisterForm  /> : null }
        { ("profile"==componentName && !authStates.login && !authStates.register && authStates.loggedIn) ? <ProfileTab /> : null }
        {("settings"==componentName) ? <SettingsTab/> : ""}
        {("history"==componentName) ? <HistoryTab/> : ""}
        {("todo"==componentName) ? <TodoTab/> : ""}

      </div>
    </section>
  );
}
