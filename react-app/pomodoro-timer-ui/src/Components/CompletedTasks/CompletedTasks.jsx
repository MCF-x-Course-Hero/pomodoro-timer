import * as React from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { useState, useEffect } from "react";
import apiClient from "../../Services/apiClient";

export default function CompletedTasks() {
  const { authStates, authSetStates } = useAuthContext();
  const [completedTodos, setCompletedTodos] = useState([]);
  const [error, setError] = useState({});

  useEffect(() => {
    async function getCompletedTasks() {
      const { data, error } = await apiClient.getCompletedTasks();
      if (data) setCompletedTodos(data.data);
      if (error) setError(error);
    }
    if (authStates.loggedIn) getCompletedTasks();
  }, []);

  return (
    <div>
      <p>I am completed Tasks</p>
      {completedTodos.length > 0 ? (
        completedTodos.map((element, index) => {
          return (
            <TodosPerDay
              key={index}
              todos={element.tasks}
              date={element.date}
            />
          );
        })
      ) : (
        <h4> You have not marked any tasks as complete. </h4>
      )}
    </div>
  );
}

export function TodosPerDay({ todos, date }) {
  return (
    <div className="date">
      <h3>{date}</h3>
      <div className="toulidine-blue">
        {todos.map((element, index) => {
          return (
            <div key={index} className="task">
              <p className="task-name"> {element.task}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}