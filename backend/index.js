<<<<<<< HEAD
const express = require("express"); const cors = require("cors"); const
bodyParser = require("body-parser"); const { Todo, DeletedTodo, OngoingTodo } =
	require("./schema"); const app = express(); const PORT = 8080;

app.use(bodyParser.json()); app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors()); app.use((req, res, next) => { res.set("Cache-Control",
"no-store, no-cache, must-revalidate, private"); next(); });

app.use( cors({ origin: "http://localhost:3000", methods: ["GET", "POST",
"PUT", "DELETE"], allowedHeaders: ["Content-Type", "Authorization"], }));

app.get("/todos", async (request, response) => { try { const todosCollection =
		await Todo.find({}); response.send(todosCollection); } catch
	(error) { response.status(500).send(error); } });

app.get("/deletedtodos", (request, response) => { DeletedTodo.find({})
		.then((deletedtodocollection) =>
			response.send(deletedtodocollection)) .catch((error) =>
				response.status(500).send(error)); });

app.get("/ongoingtodos", async (request, response) => { try { const
	ongoingTodoCollection = await OngoingTodo.find({});
	response.send(ongoingTodoCollection); } catch (error) {
		response.status(500).send(error); } });

app.post("/todos", async (request, response) => { try { const addedTodo = await
		Todo.save({}); response.send(addedTodo); } catch (error) {
			response.status(500).send(error); } });

app.post("/deletedtodos", async (request, response) => { try { const
	addedDeletedTodo = await DeletedTodo.save({});
	response.send(addedDeletedTodo); } catch (error) {
		response.status(500).send(error); } });

app.post("ongoingtodos", async (request, response) => { try { const
	addedOngoingTodo = await OngoingTodo.save({});
	response.send(addedOngoingTodo); } catch (error) {
		response.status(500).send(error); } });

app.delete("/todos/:id", async (request, response) => { try { const
	deletedSingleTodoId = request.params.id; const deletedSingleTodo =
		await Todo.findByIdAndDelete( deletedSingleTodoId); if
	(deletedSingleTodo) { response.send(deletedSingleTodo); } else {
		response.status(404).send({ message: "Todo not found" }); } }
	catch (error) { response.status(500).send(error); } });

app.delete("/ongoingtodos/:id", async (request, response) => { try { const
	deletedSingleOngoingTodoId = request.params.id; const
	deletedSingleOngoingTodo = await OngoingTodo.findByIdAndDelete(
		deletedSingleOngoingTodoId); if (deletedSingleOngoingTodo) {
			response.send(deletedSingleOngoingTodo); } else {
				response.status(404).send({ message:
					"OngoingTodo not found" }); } } catch
	(error) { response.status(500).send(error); } });
=======
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
>>>>>>> bdb9f06b728632e8a0077f1cfc9d920e8c780944

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
