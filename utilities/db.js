const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config();

let pool;

module.exports = {
	getPool: () => {
		if (pool) {
			return pool;
		}
		pool = mysql.createConnection({
			host: 'localhost',
			user: process.env.MYSQL_USERNAME,
			password: process.env.MYSQL_PASSWORD,
			database: process.env.MYSQL_DATABASE,
		});
		return pool;
	},
};
