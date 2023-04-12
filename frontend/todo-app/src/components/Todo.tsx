import * as React from "react";
export interface Todo {
	_id: string;
	text: string;
	completed: boolean;
}

export interface TodoItemProps {
	todo: Todo;
	onToggleComplete: (_id: string, completed: boolean) => void;
}

export class TodoItem extends React.Component<TodoItemProps, {}> {
	constructor(props: TodoItemProps) {
		super(props);
		this.handleCheckBox = this.handleCheckBox.bind(this);
	}

	handleCheckBox(event: React.ChangeEvent<HTMLInputElement>): void {
		this.props.onToggleComplete(
			this.props.todo._id,
			event.target.checked
		);
	}

	render() {
		const { text, completed } = this.props.todo;

		return (
			<div>
				<input
					type="checkbox"
					id="checkbox"
					checked={completed}
					onChange={this.handleCheckBox}
					style={{
						zIndex: 1000,
						position: "relative",
					}}
				/>
				<span> {text}</span>
			</div>
		);
	}
}
