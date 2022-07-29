import * as React from "react";
import "./Session.css";

export default function Session({session}){
    let minutes = session.duration / 60;
    return (
        <div className="session">
            <p className="type">{session.session_type}</p>
            <p className="duration">{minutes} minutes</p>
        </div>   
    )
}