import React from "react";



export default class TodoCollection extends React.Component {

    constructor (props) {
        super(props);
        this.state = {todoCollection: []}
    }

    componentDidMount() {
        fetch('http://localhost:3000/todos')
        .then((response) => response.json())
        .then((data) => {
            this.setState({todoCollection: data});
        })
        .catch((error) => {
            console.error('Error:', error)
        })

    }


    render() {
        return(<ul>

            {this.state.todoCollection.map((todo) => (<li key={todo._id}>todo.text</li>))}

        </ul>)
    }
}