const express = require('express');
const pg = require('pg');
const app = express();

const client = new pg.Client('postgres://localhost:5432/class');
app.use(express.json());
client.connect();

app.get('/class', (request, response) => {
  const SQL = `SELECT * FROM class;`;
  client.query(SQL).then(result => {
    response.send(result.rows);
  });
});

app.post('/addstudent', (request, response) => {
  const SQL = `INSERT INTO class (name,age) values ($1,$2);`;
  const POSTDATA = [request.body.name, request.body.age];
  client
    .query(SQL, POSTDATA)
    .then(() => {
      response.send('update successful');
    })
    .catch(error => {
      console.error(error);
    });
});

app.listen(5000, () => {
  console.log('listening on port 5000');
});
