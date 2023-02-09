const express = require('express');
const cors = require('cors');

const bodyParser = require('body-parser');
const Todo = require('./schema');



const app = express();
const PORT = 3000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    next();
  }); //FETCH LATEST DATA
  

app.use(cors({
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
  

// ROUTES
//ALL TODO ITEMS
app.get('/todos', (request, response) => {
    Todo.find({}, (error, todoCollection) => {
        if (error) {
            response.status(500).send(error)
        } else {
            response.set('Cache-Control', 'public, max-age=300')
            response.send(todoCollection)
 
        }
    })
    
});

// CREATE TODO ITEM

app.post('/todos', (request, response) => {
     // Create a new Todo instance

    const todo = new Todo({
        text: request.body.text
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


//EDIT TODO ITEM

app.put('/todos/:id', (request, response)=> {
    Todo.findById(request.params.id, (error, todo) => {
        if (error) {
            response.status(500).send(error);
        } else {
            todo.text = request.body.text;
            todo.completed = request.body.completed;

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



// REMOVE TODO ITEM

app.delete('/todos/:id', (request, response) => {
    Todo.findByIdAndRemove(request.params.id, (error, todo)=> {
        if(error) {
            response.status(500).send(error);
        } else {
            response.send(todo)
        }
    })

})





// LISTENING PORT
app.listen(PORT, ()=> {
    console.log(`Listening to Secure PORT ${PORT}`)
});

