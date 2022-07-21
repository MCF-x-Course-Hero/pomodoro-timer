import React from "react";

export default function ({ todo, toggleComplete, removeTodo }) {

  // this handler will evoke toggle complete whenever the respective todo's checkbox is clicked
  function handleCheckBoxClick() {
    toggleComplete(todo.id);
  }

  function handleRemoveButton() {
    removeTodo(todo.id)
  }

  console.log("is_completed", todo.is_completed)
  return (
    <div style={{ display: "flex" }}>
      <input type="checkbox" onClick={handleCheckBoxClick} />
      <li
        style={{
          color: "black",
          textDecoration: todo.is_completed ? "line-through" : null,
        }}
      >
        {todo.task}
      </li>
      <button onClick={handleRemoveButton}>x</button>
    </div>
  );
}
