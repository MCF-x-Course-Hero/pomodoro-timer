import React from "react";
import { useState } from "react";
/* in the terminal enter "npm install uuid". 
This will give a unique id to each todo we add */

import {v4 as uuidv4} from "uuid"

export default function TodoForm({ addTodo, todoList, setTodoList }) {
  // this is responsible for adding a single task to the list
  const [todo, setTodo] = useState({
    id: "",
    task: "",
    is_completed: false,
  });

  // updates task form based on input entered
  function handleTaskInputChange(event) {
    setTodo({ ...todo, task: event.target.value });
  }
  console.log("todo:", todo);

  function handleOnSubmitTask(event) {
    event.preventDefault();
    console.log("trim: ",todo.task.trim())
    if (todo.task.trim()) {
      addTodo({ ...todo, id:uuidv4() });
      // resetting task input
      setTodo({ ...todo, task: "" });
    }
  }
  console.log("todoList:", todoList);
  return (
    <div>
      <form onSubmit={handleOnSubmitTask}>
        <input
          name="task"
          type="text"
          value={todo.task}
          onChange={handleTaskInputChange}
        />
        <button type="submit">submit</button>
      </form>
    </div>
  );
}
