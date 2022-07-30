import * as React from "react";
import apiClient from "../../services/ApiClient";
import { useAuthContext } from "../../contexts/AuthContext";
import "./CompletedTasks.css";

export default function CompletedTasks() {
    return(
        <div className="completed-tasks">
            <p>I am completed Tasks!</p>
        </div>
    )
}