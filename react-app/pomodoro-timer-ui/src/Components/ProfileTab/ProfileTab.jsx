import * as React from "react";
import apiClient from "../../Services/apiClient";
import { useAuthContext } from "../../contexts/AuthContext";
import "./ProfileTab.css";

export default function ProfileTab() {
    const { authFunctions, authSetStates, authStates } = useAuthContext();
    const [totalTime, setTotalTime] = React.useState(0);
    
    React.useEffect(() => {
        const fetchTotal = async () => {
            const {data, error} = await apiClient.getTotalTime(authStates.user.username);
            if(data) setTotalTime(data.total);
            if(error) authSetStates.setError(error);
        };
        fetchTotal();
    }, []);

    
    return(
        <div className="profile-tab">
            <h1>Welcome,  {authStates.user.username}!</h1>
            <div className="member-since">
                <h2>Member Since:</h2>
                <h4>{authStates.user.createdAt}</h4>
            </div>
            <div className="work-time">
                <h2>Total Zone Time:</h2>
                <h4>{totalTime == 0 || totalTime == null ? ("You do not have any work time yet!") : 
                (`${(totalTime / 60)} ${totalTime/60 === 1 ? " minute" : " minutes"}`)}</h4>
            </div>
            <div className="buttons">
                <button onClick={authFunctions.logoutUser}>Logout</button>
                <button onClick={() => authSetStates.setDeleteUser(true)}>Delete Account</button>
            </div>
        </div>
    )
}