import * as React from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { IconButton } from "@mui/material";
import Modal from "../Modal/Modal";
import "./NotAuthHistory.css";

export default function NotAuthHistory() {
    const { authFunctions, authSetStates } = useAuthContext();
    return(
        <>
        <Modal>
            <div className="history-modal-background">
                <div className="btn-close-modal" onClick={() => {authFunctions.handleOnToggle("")}}>
                    <IconButton>
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-x"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="#ffffff"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                    </svg></IconButton>
                </div>  
                <div className="history-modal-container">
                    <p>You must be logged in to access this feature!</p>
                    <button onClick={() => {authFunctions.handleOnToggle("profile")}}>Login</button>
                </div>
            </div>
        </Modal>
        </>
    )
}