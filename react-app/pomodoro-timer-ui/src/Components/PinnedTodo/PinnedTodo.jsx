import * as React from "react";
import { IconButton } from "@mui/material";
import "./PinnedTodo.css";
import Draggable from "react-draggable";
import { useTodoContext } from "../../contexts/TodoContext";
import { useAuthContext } from "../../contexts/AuthContext";

export default function PinnedTodo() {
  const { todoVariables, todoFunctions } = useTodoContext();
  const { authStates } = useAuthContext();
  const pinnedTodo = todoVariables.pinnedTodo;
  const setPinnedTodo = todoFunctions.setPinnedTodo
  const setIsActivePin = todoFunctions.setIsActivePin

  function handlePinButton(){
    if ("todo" == authStates.componentName)
      document.getElementById(`${pinnedTodo.id}`).style.fill = "";
    setPinnedTodo({
      id: "",
      task: "",
      is_completed: false,
    });
    setIsActivePin(false);
  }

  return (
    <div>
      <Draggable offsetParent={document.querySelector(".timer")}>
        <div className={pinnedTodo.task ? "pinned-task-content" : "none"}>
          <div className="sticky">
            {pinnedTodo.task ? <div className="pin" onClick={handlePinButton}>
              <IconButton>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-x"
                  width="25"
                  height="25"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="#ffffff"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </IconButton>
            </div> : ""}
            {pinnedTodo.task ? (<p>Currently...</p>) : ""}
          </div>
          <div className="note">
          <p className="pinned-task">{pinnedTodo.task ? pinnedTodo.task : ""}</p>
          </div>
        </div>
      </Draggable>
    </div>
  );
}