const express = require('express');
const bodyParser = require('body-parser'); //interpret client requests to data formats 

const {Pool, Client} = require('pg');






const pool = new Pool({ //create an new instance of Pool (BoundPool) by extending the class Pool from pg
  host: 'localhost',
  user: 'postgres',
  password: 'nelson',
  database: 'tododb',
  port: 5432,
});


const app = express();
const PORT = 443;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

app.get('/todos', (request, response) => {
    pool.connect()
    .then(client => {
        return client.query('SELECT * FROM todo_list')
        .then(result => {
            client.release();
            response.json(result.rows)
        })
        .catch(error => {
            client.release();
            console.error(error, "Queries");
            response.status(500).json({error: 'Error on query'});
        });
    })
    .catch(error => {
        console.error(error, "DB connection")
        response.status(500).json({error: "DB connection error"})
    })
});






app.listen(PORT, ()=> {
    console.log(`Listening to Secure PORT ${PORT}`)
})