import React from "react";
import Todo from "./Todo";
import { List } from "@mui/material";
import { useTodoContext } from "../../contexts/TodoContext";
export default function TodoList() {
  const { todoVariables, todoFunctions } = useTodoContext();
  const todoList = todoVariables.todoList
  const toggleComplete = todoFunctions.toggleComplete;
  const removeTodo = todoFunctions.removeTodo;

  
  return (
    <List>
      {todoList.map((element) => (
        <Todo
          key={element.id}
          todo={element}
          toggleComplete={toggleComplete}
          removeTodo={removeTodo}
        />
      ))}
    </List>
  );
}
