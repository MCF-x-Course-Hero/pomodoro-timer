import * as React from "react";
import { createContext, useContext } from "react";
import { useState, useEffect } from "react";
import apiClient from "../Services/apiClient";

export const TodoHistoryContext = createContext();

export function useTodoHistoryContext() {
  return useContext(TodoHistoryContext);
}

export const TodoHistoryContextProvider = ({ children }) => {
  const [completedTodos, setCompletedTodos] = useState([]);
  const [pendingTodos, setPendingTodos] = useState([]);
  const [error, setError] = useState({})


  useEffect(() => {
    async function getCompletedTasks(){
        const {data, error} = await apiClient.getCompletedTasks();
        if (data) setCompletedTodos(data)
        if (error) setError(error)
      }
      getCompletedTasks();
  }, []);

  console.log("completedTodos", completedTodos)
  const todoHistoryVariables = {completedTodos, pendingTodos, error}
  const todoHistoryFunction = {setCompletedTodos, setPendingTodos, setError}

  return (
    <TodoHistoryContextProvider value = {{todoHistoryVariables, todoHistoryFunction}}>
        {children}
    </TodoHistoryContextProvider>
  )
};





