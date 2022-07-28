import * as React from "react";
import SessionHistory from "../SessionHistory/SessionHistory";
import CompletedTasks from "../CompletedTasks/CompletedTasks";
import "./HistoryTab.css";

export default function HistoryTab() {
    const [tasks, setTasks] = React.useState(false);
    return(
        <div className="history-tab">
            <div className="buttons">
                <button onClick={tasks ? () => setTasks(false) : null}>Session History</button>
                <button onClick={tasks ? null : () => setTasks(true)}>Tasks Completed</button>
            </div>
            {tasks ? <CompletedTasks /> : <SessionHistory />}
        </div>
    )
}
