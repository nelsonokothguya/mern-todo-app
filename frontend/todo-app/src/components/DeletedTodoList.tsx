import * as React from "react";
import { DeletedTodoItem, DeletedTodo } from "./DeletedTodo";



export interface DeletedTodoListProps {
	deletedtodos: DeletedTodo[];
}

export class DeletedTodoList extends React.Component<DeletedTodoListProps> {
	render() {
		const { deletedtodos } = this.props;
console.log("Deleted Todos:", deletedtodos); 
		return (
			<div>
				<h1>Deleted Todos</h1>

			{deletedtodos.map((deletedtodo)=> (
				<DeletedTodoItem 
					key={deletedtodo._id}
					deletedTodo = {deletedtodo}
				/>
			))}



			</div>
		);
	}
}
