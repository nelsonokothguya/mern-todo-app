import React from "react";
import TodoList from "./TodoList.tsx";

import Form from "./Form.tsx";

export default class App extends React.Component<{}> {
  constructor(props: {}) {
    super(props);
    this.state = {
    }
  }

 
  render() {
    return (
      <div>
        <Form />
        <TodoList/>
      </div>
    );
  }
}
