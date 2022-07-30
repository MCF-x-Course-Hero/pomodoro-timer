import * as React from "react";
// import { useAuthContext } from "../../contexts/AuthContext";
// import { useTodoHistoryContext } from "../../contexts/TodoHistoryContext";
import { useState, useEffect } from "react";
import apiClient from "../../Services/apiClient";

export default function CompletedTasks() {
  const [completedTodos, setCompletedTodos] = useState([]);
  const [pendingTodos, setPendingTodos] = useState([]);
  const [error, setError] = useState({});

  console.log("completedTodos", completedTodos);
  useEffect(() => {
    async function getCompletedTasks() {
      const { data, error } = await apiClient.getCompletedTasks();
      if (data) setCompletedTodos(data);
      if (error) setError(error);
    }
    getCompletedTasks();
  }, []);

  return (
    <div>
      <p>I am completed Tasks</p>
      {/* {completedTodos.length > 0
        ? completedTodos.map((element, index) => {
            return <Todo todo={element} key={index} />;
          })
        : ""} */}
    </div>
  );
}

export function Todo({todo}) {

  return (
    <div className="todo-row">
      <span>{todo.task}</span>
    </div>
  );
}
