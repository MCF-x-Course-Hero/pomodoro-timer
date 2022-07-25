import * as React from "react";
import "./TodoTab.css";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import { useTodoContext } from "../../contexts/TodoContext";
import { useEffect } from "react";
const LOCAL_STORAGE_KEY = "react-todo-list"

/* from material UI, use commands the following to install:
npm install @mui/material @emotion/react @emotion/styled --legacy-peer-deps
npm install @mui/icons-material --legacy-peer-deps
*/ 
import Typography from '@mui/material/Typography';

export default function TodoTab() {
  const { todoFunctions } = useTodoContext();
  const setTodoList = todoFunctions.setTodoList

  /*- This will execute everytime this component is mounted
    - if any todos are stored in local storage, set the todolist state to them and render the todos
  */
    // useEffect(()=>{
    //   console.log(1)
    //   const storageTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    //   if (storageTodos) setTodoList(storageTodos)

    // },[])

    return (
    <div className="todo-tab">
      <h3>Your Tasks </h3>
      <TodoForm/>
      <TodoList/>
    </div>
  );
}
