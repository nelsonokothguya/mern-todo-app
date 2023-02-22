import { observable, action, makeObservable } from "mobx";
import Form from "../components/Form";

interface TodoDocument {
  _id: string;
  text: string;
  completed: boolean;
}

interface TodoCollectionState {
  todoList: TodoDocument[];
}

export default class TodoCollectionStore {
  todoList: TodoDocument[] = [];

  constructor() {
    makeObservable(this, {
      todoList: observable,
      handleAddTodoButton: action,
      handleCheckBox: action,
    });

    
  }
  
}
