import * as React from "react";
import SessionHistory from "../SessionHistory/SessionHistory";
import CompletedTasks from "../CompletedTasks/CompletedTasks";
import "./HistoryTab.css";
// import { TodoHistoryContextProvider } from "../../contexts/TodoHistoryContext";

export default function HistoryTab() {
    const [tasks, setTasks] = React.useState(false);
    return(
        <div className="history-tab">
            <div className="buttons">
                <button className="history" onClick={tasks ? () => setTasks(false) : null}>Session History</button>
                <button onClick={tasks ? null : () => setTasks(true)}>Tasks Completed</button>
            </div>
            {/* <TodoHistoryContextProvider> */}
            {tasks ? <CompletedTasks /> : <SessionHistory />}
            {/* </TodoHistoryContextProvider> */}
        </div>
    )
}
