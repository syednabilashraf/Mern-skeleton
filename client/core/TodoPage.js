import React, { useState } from "react";
import TodoForm from "../component/TodoForm";
import Todo from "../component/Todo";

function TodoPage() {
  const [todos, setTodos] = useState([]);

  return (
    <div>
      <TodoForm makeTodos={(text) => setTodos([...todos, text])} />
      {todos.map((todo, index) => {
        return <Todo todoNo={index} todo={todo} key={index} />;
      })}
    </div>
  );
}

export default TodoPage;