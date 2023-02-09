import React from 'react'

export default class TodoCollection extends React.Component {
  constructor(props) {
    super(props)
    this.state = { todoCollection: [] }
  }

  componentDidMount() {
    fetch('http://localhost:3000/todos')
      .then((response) => response.json())
      .then((data) => this.setState({ todoCollection: data }))
      .catch((error) => console.error('Error: ', error))
  }

  render() {
    const todoDocuments = this.state.todoCollection

    return (
      <div>
        {todoDocuments.map(function (todoDocument) {
          return (
            <ul
              key={todoDocument._id}
              style={{
                textDecoration: todoDocument.completed
                  ? 'line-through'
                  : 'none',
              }}
            >
              <CheckBox />
              <p>{todoDocument.text}</p>
            </ul>
          )
        })}
      </div>
    )
  }
}

export class CheckBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = { checked: false }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange() {
    this.setState({ checked: !this.state.checked })

    // Add code to delete the todo from the DB here when the checkbox is checked
    fetch('http://localhost:3000/todos/:_id', { method: 'DELETE' }) // Replace :id with the ID of the todo being deleted
      .then((response) => response.json()) // Handle response from server here
      .catch((error) => console.error('Error: ', error)) // Handle errors here
  }

  render() {
    return <input type="checkbox" onChange={this.handleChange} />
  }
}
