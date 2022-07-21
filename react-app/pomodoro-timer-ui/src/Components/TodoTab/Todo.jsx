import React from "react";

export default function ({ todo }) {
  return (
    <React.Fragment>
      <input type="checkbox" />
      <li>{todo.task}</li>
      <button>x</button>
    </React.Fragment>
  );
}
