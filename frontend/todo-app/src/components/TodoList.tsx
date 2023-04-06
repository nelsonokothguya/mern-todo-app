import * as React from "react";

export interface Todo {
	_id: string;
	text: string;
	completed: boolean;
}

export interface TodoListProps {
	todos: Todo[];
	onDeleteTodo: (id: string) => void;
}

export class TodoList extends React.Component<TodoListProps> {
	render() {
		const { todos, onDeleteTodo } = this.props;
		return (
			<div>
				<h1>Todo List</h1>
				<ul style={{listStyle: "none", padding: 0}}>
					{todos.map((todo: Todo) => (
						<li key={todo._id}>
							<input
								type="checkbox"
								checked={
									todo.completed
								}
								onChange={() =>
									onDeleteTodo(
										todo._id
									)
								}
							/>

						<span style = {{marginLeft: "10px"}}>	{todo.text} </span>
						</li>
					))}
				</ul>
			</div>
		);
	}
}
