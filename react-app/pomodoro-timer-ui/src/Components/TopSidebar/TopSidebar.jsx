import * as React from "react";
import { useSidebarContext } from "../../contexts/SidebarContext";
import darkSettings from "../../assets/dark-settings.svg";
import darkProfile from "../../assets/dark-profile.svg";
import SettingsTab from "../SettingsTab/SettingsTab";
import ProfileTab from "../ProfileTab/ProfileTab";
import settingsIcon from "../../Assets/settings.svg";
import userIcon from "../../Assets/user.svg";
import "./TopSidebar.css";
import { useSettingsContext } from "../../contexts/SettingsContext";

export default function TopSidebar() {
    const { sidebarStates, sidebarFunctions } = useSidebarContext();
    const { settingsStates } = useSettingsContext();
    return (
        <div className="top-sidebar">
            <div className="top-buttons">
                <button className={`${settingsStates.darkToggle ? "dark" : null}`} onClick={sidebarFunctions.clickProfile}>
                    <img src={settingsStates.darkToggle ? darkProfile : userIcon} alt="profile tab"></img>
                </button>
                <button className={`${settingsStates.darkToggle ? "dark" : null}`} onClick={sidebarFunctions.clickSettings}>
                    <img src={settingsStates.darkToggle ? darkSettings : settingsIcon} alt="settings tab"></img>
                </button>
            </div>
            {sidebarStates.profileOpen ? (
                <div className={`profile-sidebar-${settingsStates.darkToggle ? "dark" : ""}`}>
                    <ProfileTab />
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
