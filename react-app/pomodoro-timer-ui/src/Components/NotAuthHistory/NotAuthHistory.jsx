import * as React from "react";
import { useSidebarContext } from "../../contexts/SidebarContext";
import Modal from "../Modal/Modal";
import "./NotAuthHistory.css";

export default function NotAuthHistory() {
    const { sidebarFunctions } = useSidebarContext();
    return(
        <>
        <Modal>
                            <div className="history-modal-background">
                    <div className="history-modal-container">
                        <p>You must be logged in to access this feature!</p>
                        <button onClick={sidebarFunctions.clickProfile}>Login</button>
                    </div>
                </div>
        </Modal>
            <div className="not-auth-history">
                <div className="buttons">
                    <button>Session History</button>
                    <button>Tasks Completed</button>
                </div>
            </div>
        </>
    )
}