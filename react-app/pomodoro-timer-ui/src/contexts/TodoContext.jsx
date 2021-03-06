import * as React from "react"
import { createContext, useContext } from "react"
import { useState, useEffect } from "react"
export const TodoContext = createContext()

const LOCAL_STORAGE_KEY = "react-todo-list"

export function useTodoContext(){
    return useContext(TodoContext)
}

export const TodoContextProvider = ({children}) =>{
    // this is responsible for adding a single task to the list
    const [todo, setTodo] = useState({
        id: "",
        task: "",
        is_completed: false,
    });
    // stores list of objects containing info about each Todo created
    const [todoList, setTodoList] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const todoVariables = {todo, todoList}
    const todoFunctions = {setTodo, setTodoList, addTodo, removeTodo, toggleComplete}
    
    function addTodo(todo){
        setTodoList([todo, ...todoList])
    }

  
  function removeTodo(id){
    // filter method will return all todos except for the one matches with the id given to update 
    setTodoList(todoList.filter(element => element.id !== id))
  }

    /* Toggle complete does the following when the checkbox button is clicked:
  - maps through todoList, when it finds the todo with the id that matches the parameter,
    a new object will be returned with the is_completed attribute marked as the oppposite of what it used to be.
  - Otherwise if the id does not match, simply return the todo object as it is not the one we want to mark/unmark
  - all of this is done inside the setTodoList since we want to update the todoList in order to render it with a todo marked off.
  */ 
  function toggleComplete(id) {
    setTodoList(
      todoList.map((element)=>{
        if (id == element.id){
          return {
            ...element,
            is_completed: !element.is_completed
          }
        }
        return element
      })
    );
  }


  /*- This will execute everytime this component is mounted
    - if any todos are stored in local storage, set the todolist state to them and render the todos
  */
    useEffect(()=>{
        const storageTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
        if (storageTodos) setTodoList(storageTodos)
        setIsLoading(false)
      },[])
  
    /*- this will execute everytime a new todo is added to the list. 
      - what it does is save an updated list of todos in local storage everytime a new todo is created.
      - This will help in saving tasks despite reloading.*/
      useEffect(()=>{
        if (!isLoading) localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(todoList))
      }, [todoList])

  return (
    <TodoContext.Provider value = {{todoVariables, todoFunctions}}>
    {children}
    </TodoContext.Provider>
  );

}

