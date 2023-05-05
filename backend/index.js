const express = require("express");
const cors = require("cors");

const bodyParser = require("body-parser");
const { Todo, DeletedTodo } = require("./schema");

const app = express();
const PORT = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use((request, response, next) => {
    res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
    next();
});

app.use(
    cors({
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.get("/todos", (request, response) => {
    Todo.find({}, (error, todoCollection) => {
        if (error) {
            response.status(500).send(error);
        } else {
            response.set("Cache-Control", "public, max-age=300");
            response.send(todoCollection);
        }
    });
});

app.get("/deletedtodos", (request, response) => {
    DeletedTodo.find({}, (error, deletedtodocollection) => {
        if (error) {
            response.status(500).send(error);
        } else {
            response.set("Cache-Control", "public, max-age=300");
            response.send(deletedtodocollection);
        }
    });
});

app.post("/todos", (request, response) => {
    const todo = new Todo({ text: request.body.text });

    todo.save((error, todo) => {
        if (error) {
            response.status(500).send(error);
        } else {
            response.send(todo);
        }
    });
});

app.post("/deletedtodos", (request, response) => {
    const deletedTodo = new DeletedTodo({ text: request.body.text });

    deletedTodo.save((error, deletedTodo) => {
        if (error) {
            response.status(500).send(error);
        } else {
            response.send(deletedTodo);
        }
    });
});

app.put("/todos/:id", (request, response) => {
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
                    response.send(todo);
                }
            });
        }
    });
});

app.delete("/todos/:id", (request, response) => {
    Todo.findByIdAndRemove(request.params.id, (error, todo) => {
        if (error) {
            response.status(500).send(error);
        } else {
            const deletedTodo = new DeletedTodo({
                text: todo.text,
                completed: true,
            });

            deletedTodo.save((error, deletedTodo) => {
                if (error) {
                    response.status(500).send(error);
                } else {
                    response.send(deletedTodo);
                }
            });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Listening to Secure PORT ${PORT}`);
});
