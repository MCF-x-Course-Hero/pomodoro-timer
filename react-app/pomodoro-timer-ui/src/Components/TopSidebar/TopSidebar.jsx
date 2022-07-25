import * as React from "react";
import { useSidebarContext } from "../../contexts/SidebarContext";
import { useSettingsContext } from "../../contexts/SettingsContext";
import darkSettings from "../../assets/dark-settings.svg";
import darkProfile from "../../assets/dark-profile.svg";
import RegisterForm from "../RegisterFrom/RegisterForm";
import LoginForm from "../LoginForm/LoginForm";
import SettingsTab from "../SettingsTab/SettingsTab";
import settingsIcon from "../../Assets/settings.svg";
import userIcon from "../../Assets/user.svg";
import "./TopSidebar.css";

export default function TopSidebar() {
    const { sidebarStates, sidebarFunctions } = useSidebarContext();
    const [login, setLogin] = React.useState(false)
    const [register, setRegister ] = React.useState(true)
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
                    {login?<LoginForm
                    setLogin={setLogin}
                    setRegister={setRegister}
                    />: null}
                    {register?<RegisterForm 
                    
                    setLogin={setLogin}
                    setRegister={setRegister}
                    />: null }
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

