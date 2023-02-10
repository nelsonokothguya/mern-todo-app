import React, { Component } from 'react';
import axios from 'axios';

class Form extends Component {
  handleAddTodo = text => {
    axios.post('http://localhost:3000/todos', { text })
      .then(res => {
        const newTodo = res.data;
        this.props.onAddTodo(newTodo);
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    return (
      <form onSubmit={e => {
        e.preventDefault();
        this.handleAddTodo(this.input.value);
        this.input.value = '';
      }}>
        <input
          type="text"
          ref={node => this.input = node}
        />
        <button type="submit">Add Todo</button>
      </form>
    );
  }
}

export default Form;
