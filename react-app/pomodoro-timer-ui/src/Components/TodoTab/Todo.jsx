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
      <Checkbox
        checked={todo.is_completed}
        type="checkbox"
        onClick={handleCheckBoxClick}
      />
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
      <IconButton  onClick={handleRemoveButton}>
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
