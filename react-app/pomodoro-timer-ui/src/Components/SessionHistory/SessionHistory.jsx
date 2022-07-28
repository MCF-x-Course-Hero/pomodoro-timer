import * as React from "react";
import Session from "./../HistoryTab/Session";
import apiClient from "../../services/ApiClient";
import { useAuthContext } from "../../contexts/AuthContext";
import "./SessionHistory.jsx";

export default function SessionHistory() {
    const { authStates, authSetStates } = useAuthContext();
    React.useEffect(() => {
        const fetchSessions = async () => {
          const { data, error } = await apiClient.getSessions(authStates.user.username);
          if (data) {
            console.log(data);
            authSetStates.setSessionsList(data.sessionHistory);
          }
          if (error) authSetStates.setError(error);
        };
        fetchSessions();
    }, []);
    
    return(
        <div className="session-history">
            <div className="sessions">
                {authStates.sessionsList.map((element)=>{
                    return <Session key={element.id} session={element}/>
                })}
            </div>
        </div>
    )
}