import * as React from "react";
import {Todo} from "./Todo";

export interface DeletedTodo extends Todo {}

export interface DeletedTodoItemProps {
	deletedTodo: DeletedTodo;
}

export class DeletedTodoItem extends React.Component <DeletedTodoItemProps> {
	render() {
		const {deletedTodo} = this.props;

		return (
			<div>
				<input type="checkbox" checked={true} disabled/>  
				<span style = {{textDecoration: "line-through"}}> {deletedTodo.text}</span>  
			</div>

		)
	}
}
