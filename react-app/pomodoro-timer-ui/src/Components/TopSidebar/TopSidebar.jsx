import * as React from "react";
import { useSidebarContext } from "../../contexts/SidebarContext";
import settingsIcon from "../../Assets/settings.svg";
import userIcon from "../../Assets/user.svg";
import "./TopSidebar.css";
import ProfileTab from "../ProfileTab/ProfileTab";
 import RegisterForm from "../RegisterFrom/RegisterForm";
import LoginForm from "../LoginForm/LoginForm";
// import LoginForm from "../LoginForm/LoginForm";
// import Register from "../Register/Registration";



export default function TopSidebar() {
    const { sidebarStates, sidebarFunctions } = useSidebarContext();
    const [login, setLogin] = React.useState(false)
    const [register, setRegister ] = React.useState(true)
    return (
        <div className="top-sidebar">
            <div className="top-buttons">
                <button onClick={sidebarFunctions.clickProfile}>
                    <img src={userIcon} alt="profile tab"></img>
                </button>
                <button onClick={sidebarFunctions.clickSettings}>
                    <img src={settingsIcon} alt="settings tab"></img>
                </button>
            </div>
            {sidebarStates.profileOpen ? (
                <div className="profile-sidebar">
                    {login?<LoginForm
                    setLogin={setLogin}
                    setRegister={setRegister}
                    />: null}
                    {register?<RegisterForm 
                    
                    setLogin={setLogin}
                    setRegister={setRegister}
                    />: null }
                    {/* <LoginForm/>
                    <Register/> */}
                    {/* <RegisterForm/> */}
                    <ProfileTab/>
                </div>
            ) : null}

            {sidebarStates.settingsOpen ? (
                <div className="settings-sidebar">
                    <p>Ta-Da! Settings</p>
                </div>
            ) : null}
        </div>
    )
}

