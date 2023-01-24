const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');
const { Todo } = require('../index');

chai.use(chaiHttp);

describe('GET /', () => {
    it('should return all todos', async () => {
        const res = await chai.request(app).get('/');
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
    });
});

describe('POST /todos', () => {
    it('should create a new todo', async () => {
        const res = await chai.request(app)
            .post('/todos')
            .send({ text: 'Test todo' });
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('text', 'Test todo');
    });
});

describe('PUT /todos/:id', () => {
    it('should update a todo', async () => {
        const todo = await Todo.create({ text: 'Test todo' });
        const res = await chai.request(app)
            .put(`/todos/${todo._id}`)
            .send({ completed: true });
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('completed', true);
    });
});

describe('DELETE /todos/:id', () => {
    it('should delete a todo', async () => {
        const todo = await Todo.create({ text: 'Test todo' });
        const res = await chai.request(app)
            .delete(`/todos/${todo._id}`);
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message', 'Todo deleted successfully');
    });
});