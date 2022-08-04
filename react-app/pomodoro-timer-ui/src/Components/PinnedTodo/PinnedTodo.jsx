import * as React from "react";
import "./PinnedTodo.css";
import { useTodoContext } from "../../contexts/TodoContext";
import { useState, useEffect } from "react";

export default function PinnedTodo() {
  const { todoVariables, todoFunctions } = useTodoContext();
  const pinnedTodo = todoVariables.pinnedTodo;
  const setPinnedTodo = todoFunctions.setPinnedTodo
  const setIsActivePin = todoFunctions.setIsActivePin
  const todoList = todoVariables.todoList;
  const isActivePin = todoVariables.isActivePin;

    function handlePinButton(){
        setPinnedTodo({
            id: "",
            task: "",
            is_completed: false,
          })

          if (isActivePin) document.getElementById(`${setPinnedTodo.id}`).style.fill = "none"
          setIsActivePin(false)
    }


 

  return (
      <div className={pinnedTodo.task ? "pinned-task-content" : ""}>
        {pinnedTodo.task? <svg
          onClick={handlePinButton}
          xmlns="http://www.w3.org/2000/svg"
          className="pin"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="#000000"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M15 4.5l-4 4l-4 1.5l-1.5 1.5l7 7l1.5 -1.5l1.5 -4l4 -4" />
          <line x1="9" y1="15" x2="4.5" y2="19.5" />
          <line x1="14.5" y1="4" x2="20" y2="9.5" />
        </svg> : ""}
        <p className="pinned-task">{pinnedTodo.task ? pinnedTodo.task : ""}</p>
    </div>
  );
}