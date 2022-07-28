import * as React from "react";
import "./session.css";

export default function Session({session}){
    return (
        <div className="session">
            <h4>{session.session_type}</h4>
            <p>{session.duration}</p>
        </div>   
    )
}