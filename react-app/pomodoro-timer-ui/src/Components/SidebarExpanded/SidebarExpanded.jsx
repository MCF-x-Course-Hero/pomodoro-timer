import * as React from "react";
import "./SidebarExpanded.css";
import SettingsTab from "../SettingsTab/SettingsTab";
import HistoryTab from "../HistoryTab/HistoryTab";
import TodoTab from "../TodoTab/TodoTab";
import ProfileTab from "../ProfileTab/ProfileTab";



export default function SidebarExpanded({handleOnToggle, componentName}) {


  return (
    <section className="sidebar-expanded">
      <div className="side-nav" id="side-menu">
        <a href="#" className="btn-close" onClick={handleOnToggle}>
          &times;
        </a>

        {("profile"==componentName) ? <ProfileTab/> : ""}

      </div>
    </section>
  );
}
