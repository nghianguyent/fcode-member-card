const mysql = require('mysql');
const configs = require('../../configs');

let pool;

module.exports = {
	getPool: () => {
		if (!pool) {
			pool = mysql.createPool({
				host: configs.MYSQL_HOST,
				user: configs.MYSQL_USERNAME,
				password: configs.MYSQL_PASSWORD,
				database: configs.MYSQL_DATABASE,
			});
		}
		return pool;
	},
};
