import * as React from "react";
import { useSettingsContext } from "../../contexts/SettingsContext";
import { useAuthContext } from "../../contexts/AuthContext";
import LoginForm from "../LoginForm/LoginForm";
import RegisterForm from "../RegisterForm/RegisterForm";
import SettingsTab from "../SettingsTab/SettingsTab";
import HistoryTab from "../HistoryTab/HistoryTab";
import TodoTab from "../TodoTab/TodoTab";
import ProfileTab from "../ProfileTab/ProfileTab";
import NotAuthHistory from "../NotAuthHistory/NotAuthHistory";
import AboutTab from "../AboutTab/AboutTab";
import { IconButton } from "@mui/material";
import "./SidebarExpanded.css";

export default function SidebarExpanded() {
  const { settingsStates } = useSettingsContext();
  const { authStates, authSetStates, authFunctions } = useAuthContext();

  return (
    <section className="sidebar-expanded">
      <div className={`side-nav ${settingsStates.session}-${settingsStates.theme}`} id="side-menu">
        <div className="btn-close" onClick={() => {authFunctions.handleOnToggle(""); authSetStates.setActive("")}}>
          <IconButton>

          <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-x"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#ffffff"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg></IconButton>
        </div>
        { ("profile" == authStates.componentName && !authStates.loggedIn && authStates.login) ? <LoginForm /> : null }
        { ("profile" == authStates.componentName && !authStates.loggedIn && authStates.register) ? <RegisterForm  /> : null }
        { ("profile" == authStates.componentName && !authStates.login && !authStates.register && authStates.loggedIn) ? <ProfileTab /> : null }
        { ("settings" == authStates.componentName) ? <SettingsTab/> : null }
        { ("history" == authStates.componentName && authStates.loggedIn) ? <HistoryTab/> : null }
        { ("history" == authStates.componentName && !authStates.loggedIn) ? <NotAuthHistory /> : null }
        { ("todo" == authStates.componentName) ? <TodoTab/> : null }
        { ("about" == authStates.componentName) ? <AboutTab/> : null }
      </div>
    </section>
  );
}
