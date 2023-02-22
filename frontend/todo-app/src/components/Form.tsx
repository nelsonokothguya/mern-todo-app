import * as React from "react";
import axios from "axios";

interface State {
  text: string;
  completed: boolean;
}

export default class Form extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      text: "",
      completed: false,
    };
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ text: event.target.value });
  };
  handleAddTodoButton = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios
      .post("http://localhost:3000/todos", {
        text: this.state.text,
      })
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  render() {
    return (
      <form onSubmit={this.handleAddTodoButton}>
        <input
          type="text"
          placeholder="...type todo"
          value={this.state.text}
          onChange={this.handleInputChange}
        />
        <button type="submit">Add todo</button>
      </form>
    );
  }
}
