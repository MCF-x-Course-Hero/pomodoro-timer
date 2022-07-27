import * as React from "react";
import "./HistoryTab.css";
import Session from "./Session";
import { useSessionContext } from "../../contexts/SessionContext";
export default function HistoryTab() {
    console.clear()
    const {sessionVariables, sessionFunctions} = useSessionContext()
    const sessionsList = sessionVariables.sessionsList
    console.log("%c historytab sessionslist","background-color:pink; color:navy; font-size:14px",sessionsList)

    const setSessionsList = sessionFunctions.setSessionsList
    const isLoading = sessionVariables.isLoading
    const setIsLoading = sessionFunctions.setIsLoading
    const error = sessionVariables.error
    const setError = sessionFunctions.setError

    return(
        <div className="history-tab">
            <p>I am the history tab!</p>

            <div className="sessions-container">
            {sessionsList.map((element)=>{
                return <Session key={element.id} session={element}/>
            })}
            </div>
        </div>


    )
}