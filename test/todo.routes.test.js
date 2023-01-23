const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index'); // or the path to your index.js file

chai.use(chaiHttp);

describe('GET /', () => {
    it('should return all todos', async () => {
      const res = await chai.request(app).get('/');
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array');
      // you can assert other properties of the returned todos here
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
      // you can assert other properties of the created todo here
    });
});

describe('PUT /todos/:id', () => {
    it('should update a todo', async () => {
      const res = await chai.request(app)
        .put('/todos/5c9a8e0fcfa7a919f4c6e7e8')
        .send({ completed: true });
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('completed', true);
      // you can assert other properties of the updated todo here
    });
});

describe('DELETE /todos/:id', () => {
    it('should delete a todo', async () => {
      const res = await chai.request(app)
        .delete('/todos/5c9a8e0fcfa7a919f4c6e7e8');
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('message', 'Todo deleted successfully');
    });
});