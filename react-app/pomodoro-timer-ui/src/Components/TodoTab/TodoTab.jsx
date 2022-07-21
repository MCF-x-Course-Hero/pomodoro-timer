import * as React from "react";
import "./TodoTab.css";
import { useState, useEffect } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

const LOCAL_STORAGE_KEY = "react-todo-list"

export default function TodoTab() {

    const [todoList, setTodoList] = useState([])

    function addTodo(todo){
        setTodoList([todo, ...todoList])
    }

  /*- This will execute everytime this component is mounted
    - if any todos are stored in local storage, set the todolist state to them and render the todos
  */
    useEffect(()=>{
      const storageTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
      if (storageTodos) setTodoList(storageTodos)

    },[])

  /*- this will execute everytime a new todo is added to the list. 
    - what it does is save an updated list of todos in local storage everytime a new todo is created.
    - This will help in saving tasks despite reloading.*/
    useEffect(()=>{
      localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(todoList))
    }, [todoList])


    return (
    <div className="list-tab">
      <p>I am the list tab!</p>

      <TodoForm addTodo={addTodo} todoList= {todoList} setTodoList ={setTodoList}/>
      <TodoList todoList={todoList}/>
    </div>
  );
}
