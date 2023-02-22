import * as React from "react";

import { observable, action } from "mobx";
import axios from "axios";
import { observer } from "mobx-react";

interface TodoDocument {
  _id: string;
  text: string;
  completed: boolean;
}

interface TodoListState {
  todoList: TodoDocument[];
}

export default class TodoList extends React.Component<{}, TodoListState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      todoList: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:3000/todos")
      .then((response) => this.setState({ todoList: response.data }))
      .catch((error) => console.log(error));
  }

  handleCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {};

  render() {
    return (
      <div>
        {this.state.todoList.map((todoDocument) => (
          <div>
            <ul>
              <label>
                <input
                  type="checkbox"
                  key={todoDocument._id}
                  onChange={this.handleCheckBox}
                />
              </label>

              <li key={todoDocument._id}>{todoDocument.text}</li>
            </ul>
          </div>
        ))}
      </div>
    );
  }
}
