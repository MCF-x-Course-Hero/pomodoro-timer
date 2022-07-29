import * as React from "react";
import { useSidebarContext } from "../../contexts/SidebarContext";
import { useSettingsContext } from "../../contexts/SettingsContext";
import { useAuthContext } from "../../contexts/AuthContext";
import darkSettings from "../../assets/dark-settings.svg";
import darkProfile from "../../assets/dark-profile.svg";
import ProfileTab from "../ProfileTab/ProfileTab";
import RegisterForm from "../RegisterForm/RegisterForm";
import LoginForm from "../LoginForm/LoginForm";
import SettingsTab from "../SettingsTab/SettingsTab";
import settingsIcon from "../../Assets/settings.svg";
import userIcon from "../../Assets/user.svg";
import "./TopSidebar.css";

export default function TopSidebar() {
    const { sidebarStates, sidebarFunctions } = useSidebarContext();
    const { settingsStates } = useSettingsContext();
    const { authStates } = useAuthContext();
    return (
        <div className="top-sidebar">
            <div className="top-buttons">
                <button className={`${settingsStates.darkToggle ? "dark" : "light"}`} onClick={sidebarFunctions.clickProfile}>
                    <img src={settingsStates.darkToggle ? darkProfile : userIcon} alt="profile tab"></img>
                </button>
                <button className={`${settingsStates.darkToggle ? "dark" : "light"}`} onClick={sidebarFunctions.clickSettings}>
                    <img src={settingsStates.darkToggle ? darkSettings : settingsIcon} alt="settings tab"></img>
                </button>
            </div>
            {sidebarStates.profileOpen ? (
                <div className={`profile-sidebar-${settingsStates.darkToggle ? "dark" : ""}`}>
                    { (!authStates.loggedIn && authStates.login) ? <LoginForm /> : null}
                    { (!authStates.loggedIn && authStates.register) ? <RegisterForm  /> : null }
                    { (!authStates.login && !authStates.register && authStates.loggedIn) ? <ProfileTab /> : null }
                </div>
            ) : null}
            {sidebarStates.settingsOpen ? (
                <div className={`settings-sidebar-${settingsStates.darkToggle ? "dark" : ""}`}>
                    <SettingsTab />
                </div>
            ) : null}
        </div>
    )
}

