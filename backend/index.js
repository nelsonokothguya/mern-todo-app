const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Todo = require('./schema');


Todo.updateMany({}, {
    $set: {
      priority: 'Low',
      assignedTo: 'John Doe'
    }
  }, (error, result) => {
    if (error) {
      console.error(error);
    } else {
      console.log(`${result.n} todos updated with new schema.`);
    }
  });


const app = express();
const PORT = 3000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.use(cors({
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
  

// ROUTES
//ALL TODOS
app.get('/', (request, response) => {
    //find all todos in the database

    Todo.find({}, (error, todos) => {
        if (error) {
            response.status(500).send(error)
        } else {
            response.set('Cache-Control', 'public, max-age=300')
            response.send(todos)
 
        }
    })
    
});

// CREATE TODOS

app.post('/todos', (request, response) => {
     // Create a new Todo instance

    const todo = new Todo({
        text: request.body.text,
        priority: request.body.priority,
        assignedTo: request.body.assignedTo
    });

    //save the created todo to the DB
    todo.save((error, todo)=> {
        if (error) {
            response.status(500).send(error);
        } else {
            response.send(todo);
        }
    });
});


//EDIT TODOS

app.put('/todos/:id', (request, response)=> {
    Todo.findById(request.params.id, (error, todo) => {
        if (error) {
            response.status(500).send(error);
        } else {
            todo.text = request.body.text;
            todo.save((error, todo) => {
                if (error) {
                    response.status(500).send(error);
                } else {
                    response.send(todo)
                }
            })
        }
    })
});



// REMOVE TODOS

app.delete('/todos/:id', (request, response) => {
    Todo.findByIdAndRemove(request.params.id, (error, todo)=> {
        if(error) {
            response.status(500).send(error);
        } else {
            response.send(todo)
        }
    })

})





// LISTENING FUNCTION

app.listen(PORT, ()=> {
    console.log(`Listening to Secure PORT ${PORT}`)
})