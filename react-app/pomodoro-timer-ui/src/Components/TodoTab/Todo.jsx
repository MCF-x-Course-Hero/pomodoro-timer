import React from "react";

export default function ({ todo }) {
  return (
    <div style = {{display:"flex"}}>
      <input type="checkbox" />
      <li
        style={{
            color:"black",
            textDecoration:todo.completed ? "line-through": null
        }}
      >{todo.task}</li>
      <button>x</button>
    </div>
  );
}
