const express = require('express');
const mysql = require('mysql');

const app = express();
const env = require('dotenv');

const routeUser = require('./routes/users');

const port = process.env.PORT || 3000;

env.config();

const con = mysql.createConnection({
	host: 'localhost',
	user: process.env.MYSQL_USERNAME,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DATABASE,
});

app.use('/users', routeUser);
app.get('/', (req, res) => {
	console.log('Hello, world!');
	res.status(200).send('hello, world!');
});

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});

con.connect((err) => {
	if (err) {
		throw err;
	}
	console.log('success');
});

con.end();
