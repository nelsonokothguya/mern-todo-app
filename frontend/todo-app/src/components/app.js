
import React from "react";
import TodoList from "./TodoList";


export default class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isClicked: false
      };
    }

    render() {
 
      return (
        <div>

          <TodoList/>
        </div>
      );
    }
  }
  
  
