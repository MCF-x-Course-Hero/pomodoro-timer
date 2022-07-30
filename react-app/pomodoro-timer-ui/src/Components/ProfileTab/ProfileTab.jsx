import * as React from "react";
import apiClient from "../../Services/apiClient";
import { useAuthContext } from "../../contexts/AuthContext";
import "./ProfileTab.css";

export default function ProfileTab() {
    const { authFunctions, authSetStates, authStates } = useAuthContext();
    const [totalTime, setTotalTime] = React.useState(0);
    return(
        <div className="profile-tab">
            <h1>{authStates.user.username}</h1>
            <div className="member-since">
                <h2>Member Since</h2>
                <h4>{authStates.user.createdAt}</h4>
            </div>
            <div className="work-time">
                <h2>Total Zone Time</h2>
                <h4>{totalTime / 60} minutes</h4>
            </div>
            <div className="buttons">
                <button onClick={authFunctions.logoutUser}>Logout</button>
                <button onClick={() => authSetStates.setDeleteUser(true)}>Delete Account</button>
            </div>
        </div>
    )
}