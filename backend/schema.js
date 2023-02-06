
const mongoose = require('mongoose');

//CONNECT TO MONGODB DATABASE
mongoose.connect('mongodb://localhost/todos', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB...', err));


mongoose.set('strictQuery', true);

const Schema = mongoose.Schema;
 const TodoSchema = new Schema({
    text: {
      type: String,
      required: true
    },
    completed: {
      type: Boolean,
      default: false
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
  });



  

module.exports = mongoose.model('Todo', TodoSchema);

