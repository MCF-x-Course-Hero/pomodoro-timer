import * as React from "react";
import Session from "./../Session/Session";
import apiClient from "../../services/ApiClient";
import { useAuthContext } from "../../contexts/AuthContext";
import "./SessionHistory.css";

export default function SessionHistory() {
    const { authStates, authSetStates } = useAuthContext();
    const [userSessions, setUserSessions] = React.useState({});
    const [retrieved, setRetrieved] = React.useState(false);

    return(
        <div className="session-history">
            { retrieved ? (userSessions.data.map((date, idx) => {
                return (<div className="date" key={idx}>
                    <h3>{date.date}</h3>
                    <div className="toulidine-blue">
                        {/* {date.session.map((element, idx) => {
                            return (<Session key={idx} session={element}/>)
                        })} */}
                    </div>
                </div>)
            })) : null }
        </div>
    )
}