"use strict";

var express = require('express');

var cors = require('cors');

var bodyParser = require('body-parser');

var Todo = require('./schema');

var app = express();
var PORT = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors());
app.use(function (req, res, next) {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  next();
}); //FETCH LATEST DATA

app.use(cors({
  origin: 'http://localhost:3001',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
})); // ROUTES
//ALL TODO ITEMS

app.get('/todos', function (request, response) {
  Todo.find({}, function (error, todoCollection) {
    if (error) {
      response.status(500).send(error);
    } else {
      response.set('Cache-Control', 'public, max-age=300');
      response.send(todoCollection);
    }
  });
}); // CREATE TODO ITEM

app.post('/todos', function (request, response) {
  // Create a new Todo instance
  var todo = new Todo({
    text: request.body.text
  }); //save the created todo to the DB

  todo.save(function (error, todo) {
    if (error) {
      response.status(500).send(error);
    } else {
      response.send(todo);
    }
  });
}); //EDIT TODO ITEM

app.put('/todos/:id', function (request, response) {
  Todo.findById(request.params.id, function (error, todo) {
    if (error) {
      response.status(500).send(error);
    } else {
      todo.text = request.body.text;
      todo.save(function (error, todo) {
        if (error) {
          response.status(500).send(error);
        } else {
          response.send(todo);
        }
      });
    }
  });
}); // REMOVE TODO ITEM

app["delete"]('/todos/:id', function (request, response) {
  Todo.findByIdAndRemove(request.params.id, function (error, todo) {
    if (error) {
      response.status(500).send(error);
    } else {
      response.send(todo);
    }
  });
}); // LISTENING PORT

app.listen(PORT, function () {
  console.log("Listening to Secure PORT ".concat(PORT));
});