import * as React from "react";


export default function Session({session}){

    return (
        
        <div className="session-row">{session.hour}:{session.minute}:{session.second}</div>
    )

}