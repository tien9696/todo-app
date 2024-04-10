import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('all');

  
  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (input.trim() !== '') {
      setTodos([...todos, { text: input, completed: false }]);
      setInput('');
    }
  };

  const toggleComplete = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const deleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const deleteAllCompleted = () => {
    const newTodos = todos.filter(todo => !todo.completed);
    setTodos(newTodos);
  };

  const clearAll = () => {
    setTodos([]);
  };

  return (
    <div className="App">
      <h1>#todo</h1>
      <div className="todo-input">
        <input
          type="text"
          placeholder="add details..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <div className="filters">
        <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>All</button>
        <button className={filter === 'active' ? 'active' : ''} onClick={() => setFilter('active')}>Active</button>
        <button className={filter === 'completed' ? 'active' : ''} onClick={() => setFilter('completed')}>Completed</button>
      </div>
      <ul className="todo-list">
        {todos.map((todo, index) => {
          if (filter === 'active' && todo.completed) {
            return null;
          } else if (filter === 'completed' && !todo.completed) {
            return null;
          }
          return (
            <li key={index} className={todo.completed ? 'completed' : ''}>
              <span onClick={() => toggleComplete(index)}>{todo.text}</span>
              <button onClick={() => deleteTodo(index)}>Delete</button>
            </li>
          );
        })}
      </ul>
      {todos.some(todo => todo.completed) && (
        <div className="action-buttons">
          <button onClick={deleteAllCompleted}>Delete Completed</button>
        </div>
      )}
      {todos.length > 0 && (
        <div className="action-buttons">
          <button onClick={clearAll}>Clear All</button>
        </div>
      )}
    </div>
  );
}

export default App;
