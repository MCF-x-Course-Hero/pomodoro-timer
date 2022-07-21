import * as React from "react";
import "./TodoTab.css";
import { useState } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";


export default function TodoTab() {

    const [todoList, setTodoList] = useState([])

    function addTodo(todo){
        setTodoList([todo, ...todoList])
    }

    return (
    <div className="list-tab">
      <p>I am the list tab!</p>

      <TodoForm addTodo={addTodo} todoList= {todoList} setTodoList ={setTodoList}/>
      <TodoList todoList={todoList}/>
    </div>
  );
}
