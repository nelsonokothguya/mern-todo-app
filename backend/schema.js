const mongoose = require("mongoose");

<<<<<<< HEAD
mongoose .connect("mongodb://localhost/tododb", { useNewUrlParser: true,
	useUnifiedTopology: true, })
=======
mongoose
    .connect("mongodb://localhost/todos", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
>>>>>>> bdb9f06b728632e8a0077f1cfc9d920e8c780944

    .then(() => console.log("Connected to MongoDB..."))
    .catch((err) => console.error("Could not connect to MongoDB...", err));

mongoose.set("strictQuery", true);

const Schema = mongoose.Schema;
const TodoSchema = new Schema({
    text: { type: String, required: true },
    completed: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
});

<<<<<<< HEAD
const OngoingTodoSchema = new Schema({ text: { type: String, required: true },
	completed: { type: Boolean, default: false }, createdAt: { type: Date,
		default: Date.now }, });

const DeletedTodoSchema = new Schema({ text: { type: String, required: true },
	completed: { type: Boolean, default: true }, createdAt: { type: Date,
		default: Date.now }, });

module.exports = { Todo: mongoose.model("Todo", TodoSchema), DeletedTodo:
	mongoose.model("DeletedTodo", DeletedTodoSchema), OngoingTodo:
	mongoose.model("OngoingTodo", OngoingTodoSchema), };
=======
const DeletedTodoSchema = new Schema({
    text: { type: String, required: true },
    completed: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
});

module.exports = {
    Todo: mongoose.model("Todo", TodoSchema),
    DeletedTodo: mongoose.model("DeletedTodo", DeletedTodoSchema),
};
>>>>>>> bdb9f06b728632e8a0077f1cfc9d920e8c780944
