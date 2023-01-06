import { useState } from "react";

const Todo = () => {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos([...todos, todo]);
  };

  const removeTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <div className="todo">
      <h1>Todo List</h1>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo}
            <button onClick={() => removeTodo(index)}>X</button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Add todo"
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            addTodo(event.target.value);
            event.target.value = "";
          }
        }}
      />
    </div>
  );
};
export default Todo;
