import React, { Component } from 'react';
import axios from 'axios';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:3000/todos')
      .then(res => {
        this.setState({ todos: res.data });
      })
      .catch(err => {
        console.error(err);
      });
  }

  handleCheckboxChange = id => {
    axios.delete(`http://localhost:3000/todos/${id}`)
      .then(res => {
        const updatedTodos = this.state.todos.filter(function (todo) {
            return todo._id !== id;
          });
        this.setState({ todos: updatedTodos });
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    return (
      <div>
        <h3>Todo List</h3>
        <div>
          {this.state.todos.map(todo => (
            <p key={todo._id}>
              <input
                type="checkbox"
                onChange={() => this.handleCheckboxChange(todo._id)}
              />
              <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                {todo.text}
              </span>
            </p>
          ))}
        </div>
      </div>
    );
  }
}

export default TodoList;
