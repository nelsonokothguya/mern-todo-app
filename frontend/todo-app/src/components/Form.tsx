import * as React from "react";
import axios, { AxiosError } from "axios";
import { Todo } from "./TodoList";

interface FormProps {
	onAddTodo: (todo: Todo) => void;
}

interface State {
	text: string;
}

export class Form extends React.Component<FormProps, State> {
	constructor(props: FormProps) {
		super(props);
		this.state = {
			text: "",
		};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleAddTodoButton = this.handleAddTodoButton.bind(this);
	}

	handleInputChange(event: React.ChangeEvent<HTMLInputElement>): void {
		this.setState({ text: event.target.value });
	}
	handleAddTodoButton(event: React.FormEvent<HTMLFormElement>): void {
		event.preventDefault();
		axios.post<Todo>("http://localhost:8080/todos", {
			text: this.state.text,
			completed: false,
		})
			.then((response: { data: Todo }) => {
				this.props.onAddTodo(response.data);
				this.props.onAddTodo(response.data);
				this.setState({ text: "" });
			})
			.catch((error: AxiosError) => console.log(error));
	}

	render(): JSX.Element {
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
