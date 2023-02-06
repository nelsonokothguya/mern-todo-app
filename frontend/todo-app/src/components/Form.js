
import React from "react";




export default class Form extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        inputValue: ""
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
     
    };

    handleChange = (e) => {
      this.setState({
        inputValue: e.target.value
      });
    };


    handleSubmit = (e) => {
      e.preventDefault();

      //POST REQUEST
      fetch('http://localhost:3000/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: this.state.inputValue })
      })
      .then((response) => response.json())
      .then((data) => {
        console.log('Successfully created a todo item:', data);
      })
      .catch((error) => {
        console.error('Error creating a todo:', error);
      });
    };







    render() {
      return (

       
          <form
        onSubmit={this.handleSubmit}>
          <input type="text" 
          value={this.state.inputValue}
          onChange={this.handleChange}/>

          <button type="submit">Submit</button>
        </form>

    
      )

    }
  }
  
  

