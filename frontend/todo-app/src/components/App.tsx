import axios, { AxiosError, AxiosResponse } from "axios";
import * as React from "react";
import { Form } from "./Form";
import { TodoList } from "./TodoList";

interface Todo {
	_id: string;
	text: string;
	completed: boolean;
}

interface AppState {
	todos: Todo[];
}

export default class App extends React.Component<{}, AppState> {
	constructor(props: {}) {
		super(props);
		this.state = {
			todos: [],
		};

		this.handleAddTodo = this.handleAddTodo.bind(this);
		this.handleDeleteTodo = this.handleDeleteTodo.bind(this);
	}

	componentDidMount() {
		this.fetchData();
	}

	fetchData() {
		axios.get<Todo[]>("http://localhost:8080/todos")
			.then((response: AxiosResponse<Todo[]>) =>
				this.setState({ todos: response.data })
			)
			.catch((error: AxiosError) => console.error(error));
	}

	handleAddTodo(newTodo: Todo) {
		this.setState({ todos: [...this.state.todos, newTodo] });
	}

	handleDeleteTodo(id: string) {
		axios.delete(`http://localhost:8080/todos/${id}`)
			.then((response: AxiosResponse) => {
				this.setState({
					todos: this.state.todos.filter(
						(todo) => todo._id !== id
					),
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
					onDeleteTodo={this.handleDeleteTodo}
				/>
			</div>
		);
	}
}
