import React from 'react';

import { getAllTodoItems } from '../api/api';

export default class TodoList extends React.Component {

    constructor(props) {
        super (props);
        this.state = {
            todoList: []
        }

    }

    componentDidMount() {
        getAllTodoItems()
        .then(function (todoItems) {
            this.setState({todoItems})
        })
    }

    render () {
        return (
            <div></div>

        )
    }

}