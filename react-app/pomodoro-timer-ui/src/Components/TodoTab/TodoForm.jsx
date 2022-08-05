import React from "react";
import { useState } from "react";
import { useTodoContext } from "../../contexts/TodoContext";
import "./TodoTab.css"
/* in the terminal enter "npm install uuid". 
This will give a unique id to each todo we add */
import { v4 as uuidv4 } from "uuid";

import { Button, TextField, ThemeProvider } from "@mui/material";

export default function TodoForm() {
  const { todoVariables, todoFunctions } = useTodoContext();
  const todo = todoVariables.todo;
  const todoList = todoVariables.todoList;
  const setTodo = todoFunctions.setTodo;
  const addTodo = todoFunctions.addTodo;

  // updates task form based on input entered
  function handleTaskInputChange(event) {
    setTodo({ ...todo, task: event.target.value });
  }

  function handleOnSubmitTask(event) {
    event.preventDefault();
    if (todo.task.trim()) {
      // uuidv4 gives each task a unique id for us to identify it when marking as complete/removing from the todoList state
      addTodo({ ...todo, id: uuidv4() });
      // resetting task input
      setTodo({ ...todo, task: "" });
    }
  }
  return (
    <div className="todo-form">
      <form onSubmit={handleOnSubmitTask}>
        <TextField
          variant="filled"
          label="Todo"
          size="medium"
          fullWidth
          name="task"
          type="text"
          value={todo.task}
          onChange={handleTaskInputChange}
          className="todo-form-input"
          style={{width:"315px"}}
        ></TextField>
        <Button
          size="large"
          type="submit"
          style={{
            color: "white",
            padding:"13px 13px"
          }}
        >
          SUBMIT
        </Button>
      </form>
    </div>
  );
}
