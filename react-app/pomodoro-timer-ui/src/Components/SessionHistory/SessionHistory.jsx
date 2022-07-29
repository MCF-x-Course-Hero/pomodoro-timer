import * as React from "react";
import Session from "./../Session/Session";
import apiClient from "../../services/ApiClient";
import { useAuthContext } from "../../contexts/AuthContext";
import "./SessionHistory.css";

export default function SessionHistory() {
    const { authStates, authSetStates } = useAuthContext();
    const [userSessions, setUserSessions] = React.useState({});
    const [retrieved, setRetrieved] = React.useState(false);
    React.useEffect( () => {
        setRetrieved(false);
        const fetchSessions = async () => {
          const { data, error } = await apiClient.getSessions(authStates.user.username);
          if (data) {
            setUserSessions({ ...data });
            setTimeout(() => setRetrieved(true), 10);
          }
          if (error) authSetStates.setError(error);
        };
        fetchSessions();
    }, []);

    return(
        <div className="session-history">
            { retrieved ? userSessions.data.length === 0 ? 
                <h4 className="no-sessions">You don't have any session history yet!</h4>
            : ((userSessions.data.map((date, idx) => {
                return (<div className="date" key={idx}>
                    <h3>{date.date}</h3>
                    <div className="toulidine-blue">
                        {date.session.map((element, idx) => {
                            return (<Session key={idx} session={element}/>)
                        })}
                    </div>
                </div>)
            }))) : null }
        </div>
    )
}