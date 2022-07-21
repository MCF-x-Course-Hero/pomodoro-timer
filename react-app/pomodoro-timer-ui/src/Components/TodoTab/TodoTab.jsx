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


  /* Toggle complete does the following when the checkbox button is clicked:
  - maps through todoList, when it finds the todo with the id that matches the parameter,
    a new object will be returned with the is_completed attribute marked as the oppposite of what it used to be.
  - Otherwise if the id does not match, simply return the todo object as it is not the one we want to mark/unmark
  - all of this is done inside the setTodoList since we want to update the todoList in order to render it with a todo marked off.
  */ 
  function toggleComplete(id) {
    setTodoList(
      todoList.map((element)=>{
        if (id = element.id){
          return {
            ...element,
            is_completed: !element.is_completed
          }
        }
        return element
      })
    )
  }
  
  function removeTodo(id){
    // filter method will return all todos except for the one matches with the id given to update 
    setTodoList(todoList.filter(element => element.id !== id))
  }

    return (
    <div className="list-tab">
      <p>I am the list tab!</p>

      <TodoForm addTodo={addTodo} todoList= {todoList} setTodoList ={setTodoList}/>
      <TodoList todoList={todoList} toggleComplete = {toggleComplete} removeTodo = {removeTodo}/>
    </div>
  );
}
