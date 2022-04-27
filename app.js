const express = require('express');
const mysql = require('mysql');

const app = express();
const env = require('dotenv');

env.config();

const con = mysql.createConnection({
	host: 'localhost',
	user: process.env.MYSQL_USERNAME,
	password: process.env.MYSQL_PASSWORD,
	database: 'fcode_member_card',
});

con.connect((err) => {
	if (err) {
		throw err;
	}
	console.log('success');
});

const sql = 'CREATE TABLE test (id INTEGER)';

con.query(sql, (err) => {
	if (err) {
		throw err;
	}
	console.log('success');
});

con.end();
module.exports = app;
