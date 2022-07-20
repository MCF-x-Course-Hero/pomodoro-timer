import * as React from "react";
import TopSidebar from "../TopSidebar/TopSidebar";
import BottomSidebar from "../BottomSidebar/BottomSidebar";
import { SidebarContextProvider } from "../../contexts/SidebarContext";
import "./Sidebar.css";

export default function SidebarContainer() {
    return(
        <SidebarContextProvider>
            <Sidebar />
        </SidebarContextProvider>
    )
}

function Sidebar() {
    return (
        <div className="sidebar">
            <TopSidebar />
            <BottomSidebar />
        </div>
    )
}