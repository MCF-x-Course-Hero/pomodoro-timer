import * as React from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import Modal from "../Modal/Modal";
import "./NotAuthHistory.css";

export default function NotAuthHistory() {
    const { authFunctions } = useAuthContext();
    return(
        <>
        <Modal>
            <div className="history-modal-background">
                <div className="history-modal-container">
                    <p>You must be logged in to access this feature!</p>
                    <button onClick={() => authFunctions.handleOnToggle("profile")}>Login</button>
                </div>
            </div>
        </Modal>
        </>
    )
}