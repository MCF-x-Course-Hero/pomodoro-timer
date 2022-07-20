import * as React from "React";
import { useSidebarContext } from "../../contexts/SidebarContext";
import historyIcon from "../../Assets/history.svg";
import listIcon from "../../Assets/list.svg";
import "./BottomSidebar.css";

export default function BottomSidebar() {
    const { sidebarStates, sidebarFunctions } = useSidebarContext();
    return (
        <div className="bottom-sidebar">
            <div className="bottom-buttons">
                <button onClick={sidebarFunctions.clickHistory}>
                    <img src={historyIcon} alt="history tab"></img>
                </button>
                <button onClick={sidebarFunctions.clickList}>
                    <img src={listIcon} alt="list tab"></img>
                </button>
            </div>
            {sidebarStates.historyOpen ? (
                <div className="history-sidebar">
                    <p>Ta-Da! History</p>
                </div>
            ) : null}
            {sidebarStates.listOpen ? (
                <div className="list-sidebar">
                    <p>Ta-Da! List</p>
                </div>
            ) : null}
        </div>
    )
}