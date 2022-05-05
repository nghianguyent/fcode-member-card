const express = require('express');
const env = require('dotenv');
const pool = require('./utilities/db');
const Database = require('./services/database');

const app = express();

const port = process.env.PORT || 3000;

env.config();

// test db connection
Database.getEvents((err, res) => {
	if (err) console.error(err);
	else console.log(res);
});
// Database.addEvent('name2', '2022-12-15', null, '0:0:0', null, 'NOT YET', 'SP2022', (err, res) => {
// 	if (err) console.error(err);
// 	else console.log(res);
// });
// Database.updateEvent('1651493389268', 'nameupdate', '2022-12-15', null, '0:0:0', null, 'NOT YET', 'SP2022', (err, res) => {
// 	if (err) console.error(err);
// 	else console.log(res);
// });
// Database.deleteEvent('1651493389268', (err, res) => {
// 	if (err) console.error(err);
// 	else console.log(res);
// });

// routes
app.get('/', (req, res) => {
	console.log('Hello, world!');
	res.status(200).send('hello, world!');
});

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
