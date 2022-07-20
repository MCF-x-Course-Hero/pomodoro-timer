import * as React from "react";
import TopSidebar from "../TopSidebar/TopSidebar";
import BottomSidebar from "../BottomSidebar/BottomSidebar";
import "./Sidebar.css";

export default function Sidebar() {
    return (
        <div className="sidebar">
            <TopSidebar />
            <BottomSidebar />
        </div>
    )
}