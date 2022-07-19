import * as React from "react";
import Timer from "../Timer/Timer";
import './App.css'

function App() {
  const [session, setSession] = React.useState("pomozone");
  return (
    <div className={`app${session}`}>
      <Timer session={session} setSession={setSession}/>
    </div>
  )
}

export default App
