import * as React from "react";
import Timer from "../Timer/Timer";
import SidebarContainer from "../Sidebar/Sidebar";
import './App.css'


export default function App() {
<<<<<<< HEAD
  // console.clear()
=======
  console.clear()
>>>>>>> main
  const [session, setSession] = React.useState("pomozone");
  return (
    <div className={`app-${session}`}>
      <Timer session={session} setSession={setSession}/>
      <SidebarContainer />
    </div>
  )
}
