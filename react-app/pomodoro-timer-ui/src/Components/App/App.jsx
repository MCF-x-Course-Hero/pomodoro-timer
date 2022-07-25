import * as React from "react";
import Timer from "../Timer/Timer";
import SidebarContainer from "../Sidebar/Sidebar";
import PinnedTodo from "../PinnedTodo/PinnedTodo";
import { TodoContextProvider } from "../../contexts/TodoContext";
import "./App.css";

export default function App() {
  console.clear();
  const [session, setSession] = React.useState("pomozone");
  return (
    <TodoContextProvider>
      <div className={`app-${session}`}>
        <PinnedTodo />
        <Timer session={session} setSession={setSession} />
        <SidebarContainer />
      </div>
    </TodoContextProvider>
  );
}
