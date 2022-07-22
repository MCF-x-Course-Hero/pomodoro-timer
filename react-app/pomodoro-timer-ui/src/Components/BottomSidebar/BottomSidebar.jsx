import * as React from "react";
import { useSidebarContext } from "../../contexts/SidebarContext";
import { TodoContextProvider } from "../../contexts/TodoContext";
import historyIcon from "../../Assets/history.svg";
import listIcon from "../../Assets/list.svg";
import "./BottomSidebar.css";
import HistoryTab from "../HistoryTab/HistoryTab";
import TodoTab from "../TodoTab/TodoTab";

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
          <HistoryTab />
        </div>
      ) : null}
      {sidebarStates.listOpen ? (
        <div className="list-sidebar">
          <TodoContextProvider>
            <TodoTab />
          </TodoContextProvider>
        </div>
      ) : null}
    </div>
  );
}
