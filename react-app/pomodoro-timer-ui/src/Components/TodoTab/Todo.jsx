import React from "react";
import "./TodoTab.css";
import { useTodoContext } from "../../contexts/TodoContext";
import { useState, useEffect } from "react";
import {
  Checkbox,
  IconButton,
  List,
  ListItem,
  Typography,
} from "@mui/material";

export default function ({ todo, toggleComplete, removeTodo }) {
  const { todoVariables, todoFunctions } = useTodoContext();
  const todoList = todoVariables.todoList;
  // const toggleComplete = todoFunctions.toggleComplete;
  // const removeTodo = todoFunctions.removeTodo;
  const setPinnedTodo = todoFunctions.setPinnedTodo;
  const pinnedTodo = todoVariables.pinnedTodo;
  const isActivePin = todoVariables.isActivePin;
  const setIsActivePin = todoFunctions.setIsActivePin;

  // this handler will evoke toggle complete whenever the respective todo's checkbox is clicked
  function handleCheckBoxClick() {
    toggleComplete(todo);
  }

  function handleRemoveButton() {
    removeTodo(todo);
    if (todo.id == pinnedTodo.id) {
      /* if the task removed happens to also be pinned, 
      then isActivePin and pinnedTodo states must also be reset.*/
      setPinnedTodo({
        id: "",
        task: "",
        is_completed: false,
      });
      setIsActivePin(false);
    }
  }

  function handlePinButton() {
    // isActivePin is a boolean value that denotes if there's a todo pinned.
    if (todo.is_completed) {
      if (isActivePin) {
        document.getElementById(`${pinnedTodo.id}`).style.fill = "none";
      }
      document.getElementById(`${todo.id}`).style.fill = "white";
      toggleComplete(todo);
      setPinnedTodo(todo);
      setIsActivePin(true);
      return;
    }

    if (!isActivePin) {
      //when there's no pinned todo at the moment
      setPinnedTodo(todo);
      document.getElementById(`${todo.id}`).style.fill = "white";
      setIsActivePin(true);
    } else if (todo.id != pinnedTodo.id && isActivePin) {
      /* when there's a pinned todo,
      but the user chooses to change the pin todo to something different */
      document.getElementById(`${todo.id}`).style.fill = "white";
      document.getElementById(`${pinnedTodo.id}`).style.fill = "none";
      setPinnedTodo(todo);
    } else if (todo.id == pinnedTodo.id && isActivePin) {
      /* when the user chooses to unpin the current todo without replacing it 
      with a new pinned todo*/
      document.getElementById(`${todo.id}`).style.fill = "none";
      setPinnedTodo({
        id: "",
        task: "",
        is_completed: false,
      });
      setIsActivePin(false);
    }
  }

  return (
    <List style={{ display: "flex" }}>
      <div className="todo-row">
        <div className="todo-left-side">
          <IconButton className="pin-btn" onClick={handlePinButton}>
            <svg
              id={`${todo.id}`}
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="white"
              fill={todo.id == pinnedTodo.id ? "white" : "none"}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M15 4.5l-4 4l-4 1.5l-1.5 1.5l7 7l1.5 -1.5l1.5 -4l4 -4" />
              <line x1="9" y1="15" x2="4.5" y2="19.5" />
              <line x1="14.5" y1="4" x2="20" y2="9.5" />
            </svg>
          </IconButton>
          <Checkbox
            checked={todo.is_completed}
            type="checkbox"
            onClick={handleCheckBoxClick}
            style={{
              color: "white",
            }}
          />
          <Typography
            variant="body1"
            className="task-name"
            style={{
              textDecoration: todo.is_completed ? "line-through" : null,
              padding: "9px",
            }}
          >
            {todo.task}
          </Typography>
        </div>
        <div className="close-btn">
          <IconButton onClick={handleRemoveButton}>
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-backspace"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#ffffff"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M20 6a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-11l-5 -5a1.5 1.5 0 0 1 0 -2l5 -5z" />
              <path d="M12 10l4 4m0 -4l-4 4" />

            </svg> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-trash"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#ffffff"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="10" y1="11" x2="10" y2="17" />
                <line x1="14" y1="11" x2="14" y2="17" />
                <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
              </svg>
          </IconButton>
        </div>
      </div>
    </List>
  );
}
