import * as React from "react";
import "./PinnedTodo.css"
import { useTodoContext } from "../../contexts/TodoContext";
import { useState , useEffect} from "react";

export default function PinnedTodo(){
    const {todoVariables, todoFunction} = useTodoContext()
    const pinnedTodo = todoVariables.pinnedTodo

    const [activeTodo, setActiveTodo] = useState({})

    useEffect(()=>{
        setActiveTodo(pinnedTodo)
    },[pinnedTodo])
    
    return (
        <div className={pinnedTodo.task? "pinned-task":""}>
            { pinnedTodo.task ? activeTodo.task : null }
        </div>
    )
}