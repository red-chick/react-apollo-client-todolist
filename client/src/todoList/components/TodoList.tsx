import { useState } from "react";
import useTodoList from "../hooks/useTodoList";

const TodoList = () => {
  const [inputTodo, setInputTodo] = useState("");
  const { loading, error, data, addTodo, toggleTodoComplete, removeTodo } =
    useTodoList();

  return (
    <section>
      {loading && "Loading..."}
      {!loading && error && "Error occurred!"}
      {!loading && !error && data && (
        <>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (inputTodo) {
                addTodo(inputTodo);
                setInputTodo("");
              }
            }}
          >
            <input
              placeholder="할 일을 입력하세요."
              value={inputTodo}
              onChange={(e) => setInputTodo(e.target.value)}
            />{" "}
            <button>추가</button>
          </form>
          <ul>
            {data.todoList.map(({ id, title, complete }) => (
              <li key={id}>
                <span
                  style={{ textDecoration: complete ? "line-through" : "none" }}
                >
                  {title}
                </span>{" "}
                <button onClick={() => toggleTodoComplete(id)}>
                  {complete ? "uncomplete" : "complete"}
                </button>{" "}
                <button onClick={() => removeTodo(id)}>delete</button>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
};

export default TodoList;
