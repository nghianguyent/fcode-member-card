// const pool = require('./pool');
// const getData = require('./query');
const mysql = require('mysql');
const configs = require('../../configs');
let pool;

const getPool = () => {
	if (!pool) {
		pool = mysql.createPool({
			host: configs.MYSQL_HOST,
			user: configs.MYSQL_USERNAME,
			password: configs.MYSQL_PASSWORD,
			database: configs.MYSQL_DATABASE,
		});
	}
	return pool;
};

const getData = (queryString, [...args]) => {
	return new Promise((resolve, reject) => {
		pool.query(queryString, args, (err, result) => {
			if (err) {
				return reject(err.message);
			}
			return resolve(result);
		});
	});
};

const setData = (queryString, [...args]) => {
	return new Promise((resolve, reject) => {
		pool.query(queryString, args, (err, result) => {
			if (err) {
				console.log('db err');
				return reject(err);
			}
			return resolve(result);
		});
	});
};
module.exports = {
	pool: pool,
	getPool: getPool,
	getData: getData,
	setData: setData,
};
