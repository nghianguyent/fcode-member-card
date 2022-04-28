const express = require('express');
const env = require('dotenv');
const pool = require('./utilities/db');

const app = express();

const port = process.env.PORT || 3000;

env.config();

// test db connection
const sql = 'SELECT * FROM member WHERE school_mail = ?';
pool.getPool().query(sql, ['nghiantse161180@fpt.edu.vn'], (err, res) => {
	console.log(res[0]);
});

// routes
app.get('/', (req, res) => {
	console.log('Hello, world!');
	res.status(200).send('hello, world!');
});

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
