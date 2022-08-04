import * as React from "react";
import apiClient from "../../services/ApiClient";
import { useAuthContext } from "../../contexts/AuthContext";
import "./SessionHistory.css";

export default function SessionHistory() {
    const { authStates } = useAuthContext();
    const [error, setError] = React.useState("");
    const [retrieved, setRetrieved] = React.useState(false);
    const [userSessions, setUserSessions] = React.useState({});

    React.useEffect( () => {
        const fetchSessions = async () => {
          const { data, err } = await apiClient.getSessions(authStates.user.username);
          if (data) {
            setUserSessions({ ...data });
            setTimeout(() => {setRetrieved(true)}, 10);
          }
          if (err) setError(err);
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
                            return (<Session key={idx} id={idx} session={element}/>)
                        })}
                    </div>
                </div>)
            }))) : null }
        </div>
    )
}

function Session({session, id}){
    let minutes = session.duration / 60;
    return (
        <div className="session">
            <p className="type">{session.session_type} {id + 1}</p>
            <p className="duration">{minutes} minutes</p>
        </div>   
    )
}