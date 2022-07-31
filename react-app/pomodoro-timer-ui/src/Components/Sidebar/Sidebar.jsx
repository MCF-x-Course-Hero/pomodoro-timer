import * as React from "react";
import clock from "../../assets/clock.svg";
import history from "../../assets/history.svg";
import list from "../../assets/list.svg";
import settings from "../../assets/settings.svg";
import profile from "../../assets/loginuser.svg";
import TopSidebar from "../TopSidebar/TopSidebar";
import BottomSidebar from "../BottomSidebar/BottomSidebar";
import { SidebarContextProvider } from "../../contexts/SidebarContext";
import SidebarExpanded from "../SidebarExpanded/SidebarExpanded";
import "./Sidebar.css"

export default function Sidebar({handleOnToggle}) {

  return (
    <div className="sidebar">
      <div className="sidebar-top">
        <i className="logo fa-solid fa-clock"></i>
        <span className="brand">PomoZone</span>
      </div>
      <div className="sidebar-center">
        <ul className="list">
          <li className="list-item">
            <i className="list-item-icon fa-solid fa-user"></i>
            <span className="list-item-text" onClick={()=>{handleOnToggle("profile")}}>Profile</span>
          </li>
          <li className="list-item">
            <i className="list-item-icon fa-solid fa-sliders"></i>
            <span className="list-item-text">Settings</span>
          </li>
          <li className="list-item">
            <i className="list-item-icon fa-solid fa-face-sad-tear"></i>
            <span className="list-item-text">History</span>
          </li>
          <li className="list-item">
            <i className="list-item-icon fa-solid fa-list-check"></i>
            <span className="list-item-text">To-Do List</span>
          </li>
        </ul>
      </div>
      <div className="sidebar-bottom">
        <div className="color-box default">
          <i className="list-item-icon fa-solid fa-sun"></i>
        </div>
        <div className="color-box dark">
          <i className="list-item-icon fa-solid fa-moon"></i>
        </div>
      </div>
    </div>
  );
}

function SidebarContainer() {
  return (
    <SidebarContextProvider>
      <OldSidebar />
    </SidebarContextProvider>
  );
}

function OldSidebar() {
  return (
    <div className="sidebar">
      <TopSidebar />
      <BottomSidebar />
    </div>
  );
}
