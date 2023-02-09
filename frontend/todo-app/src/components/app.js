import React from "react";
import Form from "./Form";
import TodoCollection from "./TodoCollection";



export default class App extends React.Component {
    render() {
        return (
        <div>
            <Form/>
            <TodoCollection />
        </div>
        )
    }
}