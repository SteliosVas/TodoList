import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  const [infos, setInfos] = useState([]);
  const [field, setField] = useState("");
  const [fieldEditing, setFieldEditing] = useState(null);
  const [editingText, setEditingText] = useState("");

  useEffect(() => {
    const temp = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(temp);

    if (loadedTodos) {
      setInfos(loadedTodos);
    }
  }, []);

  useEffect(() => {
    const temp = JSON.stringify(infos);
    localStorage.setItem("todos", temp);
  }, [infos]);

  const ChangeHandler = (e) => {
    setField(e.target.value);
  };

  const SubmitHandler = (e) => {
    e.preventDefault();

    const newTodo = {
      id: new Date().getTime(),
      text: field,
      completed: false,
    };

    setInfos([...infos].concat(newTodo));
    console.log(infos);
    setField("");
  };

  const deleteTodo = (id) => {
    console.log(id);
    const updatedTodos = [...infos].filter((todo) => todo.id !== id);
    console.log(updatedTodos);
    setInfos(updatedTodos);
  };

  const toggleComplete = (id) => {
    const updatedTodos = [...infos].map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });

    setInfos(updatedTodos);
  };

  const submitEdits = (id) => {
    const updatedTodos = [...infos].map((todo) => {
      if (todo.id === id) {
        todo.text = editingText;
      }
      return todo;
    });
    setInfos(updatedTodos);
    setFieldEditing(null);
    setEditingText("");
  };

  return (
    <React.Fragment>
      <form className="container" onSubmit={SubmitHandler}>
        <h1>TodoList</h1>
        <input
          className="textfield"
          placeholder="What should i do?"
          type="text"
          value={field}
          onChange={ChangeHandler}
          required
        />
        <button type="submit" className="ok">
          OK!
        </button>
      </form>
      {infos.map((todo) => (
        <div key={todo.id} className="todo">
          <div className="todo-elements">
            <input
              type="checkbox"
              id="completed"
              className="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id)}
            />
            {todo.id === fieldEditing ? (
              <input
                type="text"
                className="text"
                onChange={(e) => setEditingText(e.target.value)}
              />
            ) : (
              <div className="text">{todo.text}</div>
            )}
          </div>
          <div className="todo-actions">
            {todo.id === fieldEditing ? (
              <button
                className="submit-edit"
                onClick={() => submitEdits(todo.id)}
              >
                Submit Edits
              </button>
            ) : (
              <button className="edit" onClick={() => setFieldEditing(todo.id)}>
                Edit
              </button>
            )}

            <button className="delete" onClick={() => deleteTodo(todo.id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </React.Fragment>
  );
}

export default App;
