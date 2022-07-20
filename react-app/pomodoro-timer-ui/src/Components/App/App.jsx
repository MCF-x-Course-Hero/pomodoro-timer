import * as React from "react";
import Timer from "../Timer/Timer";
import TopSidebar from "../TopSidebar/TopSidebar";
import BottomSidebar from "../BottomSidebar/BottomSidebar";
import { SidebarContextProvider } from "../../contexts/SidebarContext";
import './App.css'

export default function App() {
  const [session, setSession] = React.useState("pomozone");
  return (
    <div className={`app-${session}`}>
      <Timer session={session} setSession={setSession}/>
      <SidebarContextProvider>
        <div className="sidebar">
          <TopSidebar />
          <BottomSidebar />
        </div>
      </SidebarContextProvider>
    </div>
  )
}
