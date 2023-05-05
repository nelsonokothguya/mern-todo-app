import axios, { AxiosError, AxiosResponse } from "axios";
import * as React from "react";
import { Form } from "./Form";
import { TodoList, TodoListProps } from "./TodoList";
import { DeletedTodoList, DeletedTodoListProps } from "./DeletedTodoList";
import { Todo } from "./Todo";
import { DeletedTodoItem, DeletedTodo } from "./DeletedTodo";

interface AppState {
   todos: Todo[];
   deletedtodos: DeletedTodo[];
}

export default class App extends React.Component<{}, AppState> {
   constructor(props: {}) {
      super(props);
      this.state = {
         todos: [],
         deletedtodos: [],
      };

      this.handleAddTodo = this.handleAddTodo.bind(this);

      this.handleToggleComplete = this.handleToggleComplete.bind(this);
   }

   componentDidMount() {
      this.fetchData();
      this.fetchDeletedData();
   }

   fetchData() {
      axios
         .get<Todo[]>("http://localhost:8080/todos")
         .then((response: AxiosResponse<Todo[]>) =>
            this.setState({ todos: response.data })
         )
         .catch((error: AxiosError) => console.error(error));
   }

   fetchDeletedData() {
      axios
         .get<DeletedTodo[]>("http://localhost:8080/deletedtodos")
         .then((response: AxiosResponse<DeletedTodo[]>) =>
            this.setState({ deletedtodos: response.data })
         )
         .catch((error: AxiosError) => console.error(error));
   }

   handleAddTodo(newTodo: Todo) {
      this.setState({ todos: [...this.state.todos, newTodo] });
   }

   handleToggleComplete(id: string, completed: boolean) {
      axios
         .delete(`http://localhost:8080/todos/${id}`)
         .then((response: AxiosResponse) => {
            const deletedTodo = this.state.todos.find(
               (todo) => todo._id === id
            );

            axios
               .post("http://localhost:8080/deletedtodos", deletedTodo)
               .then((response: AxiosResponse) => {
                  this.setState((prevState: AppState) => {
                     return {
                        todos: prevState.todos.filter(
                           (todo) => todo._id !== id
                        ),
                     };
                  });
               })
               .catch((error: AxiosError) => {
                  console.error(error);
               });
         })
         .catch((error: AxiosError) => {
            console.error(error);
         });
   }

   render() {
      return (
         <div>
            <Form onAddTodo={this.handleAddTodo} />
            <TodoList
               todos={this.state.todos}
               onToggleComplete={this.handleToggleComplete}
            />

            <DeletedTodoList deletedtodos={this.state.deletedtodos} />
         </div>
      );
   }
}
