import React from "react";
import "./TodoTab.css";
import { useTodoContext } from "../../contexts/TodoContext";

import {
  Checkbox,
  IconButton,
  List,
  ListItem,
  Typography,
} from "@mui/material";

export default function ({ todo, toggleComplete, removeTodo }) {
  // this handler will evoke toggle complete whenever the respective todo's checkbox is clicked
  function handleCheckBoxClick() {
    toggleComplete(todo.id);
  }

  function handleRemoveButton() {
    removeTodo(todo.id);
  }

  return (
    <List style={{ display: "flex" }}>
      <div className="todo-left-side">
<div className="pin-btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-pin"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="#000000"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M15 4.5l-4 4l-4 1.5l-1.5 1.5l7 7l1.5 -1.5l1.5 -4l4 -4" />
            <line x1="9" y1="15" x2="4.5" y2="19.5" />
            <line x1="14.5" y1="4" x2="20" y2="9.5" />
          </svg>
        </div>
      {/* <Checkbox
        checked={todo.is_completed}
        type="checkbox"
        onClick={handleCheckBoxClick}
      /> */}
      <input type="checkbox"/>

        </div>
      <Typography
        variant="body1"
        className="todo-text"
        style={{
          textDecoration: todo.is_completed ? "line-through" : null,
        }}
      >
        {todo.task}
      </Typography>
      
        <div className="close-btn">
          <IconButton onClick={handleRemoveButton}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 0 24 24"
              width="24"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </IconButton>
      </div>
    </List>
  );
}
