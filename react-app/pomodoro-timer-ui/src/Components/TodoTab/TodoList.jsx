import React from "react"
import Todo from "./Todo"
export default function TodoList({todoList, toggleComplete}){
    return (
        <ul>
            {todoList.map(element=>(
             <Todo key = {element.id} todo = {element} toggleComplete = {toggleComplete}/>
            ))}
        </ul>
    )
}