import React, { useState, useEffect } from "react";
import Todo from "./Todo";
import { List } from "@mui/material";
import { useTodoContext } from "../../contexts/TodoContext";
import { useAuthContext } from "../../contexts/AuthContext";
import apiClient from "../../Services/apiClient";

export default function TodoList() {
  const { authStates, authSetStates } = useAuthContext();
  const { todoVariables, todoFunctions } = useTodoContext();
  const todoList = todoVariables.todoList;
  const setTodoList = todoFunctions.setTodoList
  const toggleComplete = todoFunctions.toggleComplete;
  const removeTodo = todoFunctions.removeTodo;

  const [pendingTodos, setPendingTodos] = useState([]);
  useEffect(() => {
    async function getPendingTasks() {
      const { data, error } = await apiClient.getPendingTasks();
      if (data) setTodoList(data);
      if (error) setError(error);
    }
    if (authStates.loggedIn) getPendingTasks();
  }, []);
  return (
    <List className="todo-list">
      {pendingTodos.length > 0
        ? pendingTodos.map((element) => (
          <Todo
            key={element.id}
            todo={element}
            toggleComplete={toggleComplete}
            removeTodo={removeTodo}
          />
        ))
        : todoList.map((element) => (
            <Todo
              key={element.id}
              todo={element}
              toggleComplete={toggleComplete}
              removeTodo={removeTodo}
            />
          ))}

      {/* {todoList.map((element) => (
        <Todo
          key={element.id}
          todo={element}
          toggleComplete={toggleComplete}
          removeTodo={removeTodo}
        />
      ))} */}
    </List>
  );
}
