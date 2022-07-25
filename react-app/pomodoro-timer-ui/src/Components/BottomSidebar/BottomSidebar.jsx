import * as React from "react";
import { useSidebarContext } from "../../contexts/SidebarContext";
import { TodoContextProvider } from "../../contexts/TodoContext";
import darkHistory from "../../assets/dark-history.svg";
import darkList from "../../assets/dark-list.svg";
import historyIcon from "../../Assets/history.svg";
import listIcon from "../../Assets/list.svg";
import HistoryTab from "../HistoryTab/HistoryTab";
import TodoTab from "../TodoTab/TodoTab";
import "./BottomSidebar.css";
import { useSettingsContext } from "../../contexts/SettingsContext";

export default function BottomSidebar() {
    const { sidebarStates, sidebarFunctions } = useSidebarContext();
    const { settingsStates } = useSettingsContext();
    return (
        <div className="bottom-sidebar">
            <div className="bottom-buttons">
                <button className={`${settingsStates.darkToggle ? "dark" : null}`} onClick={sidebarFunctions.clickHistory}>
                    <img src={settingsStates.darkToggle ? darkHistory : historyIcon} alt="history tab"></img>
                </button>
                <button className={`${settingsStates.darkToggle ? "dark" : null}`} onClick={sidebarFunctions.clickList}>
                    <img src={settingsStates.darkToggle ? darkList : listIcon} alt="list tab"></img>
                </button>
            </div>
            {sidebarStates.historyOpen ? (
                <div className={`${settingsStates.darkToggle ? "dark-history" : "history-sidebar"}`}>
                    <HistoryTab />
                </div>
            ) : null}
            {sidebarStates.listOpen ? (
                <div className={`${settingsStates.darkToggle ? "dark-list" : "list-sidebar"}`}>
                  <TodoContextProvider>
                    <TodoTab />
                  </TodoContextProvider>
                </div>
            ) : null}
        </div>
  );
}
