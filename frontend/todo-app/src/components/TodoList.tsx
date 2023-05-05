import * as React from "react";
import { Todo, TodoItem } from "./Todo";

export interface TodoListProps {
   todos: Todo[];
   onToggleComplete: (_id: string, completed: boolean) => void;
}

export class TodoList extends React.Component<TodoListProps> {
   render() {
      const { todos, onToggleComplete } = this.props;
      return (
         <div>
            <h1>Todo List</h1>
            {todos.map((todo) => (
               <TodoItem
                  key={todo._id}
                  todo={todo}
                  onToggleComplete={onToggleComplete}
               />
            ))}
         </div>
      );
   }
}
