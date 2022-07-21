import React from "react"
import Todo from "./Todo"
export default function TodoList({todoList}){
    return (
        <ul>
            {todoList.map(element=>(
             <Todo key = {element.id} todo = {element}/>
            ))}
        </ul>
    )
}