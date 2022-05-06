const db = require('./pool').getPool();

const getData = (queryString, [...args]) => {
	return new Promise((resolve, reject) => {
		db.query(queryString, args, (err, result) => {
			if (err) {
				return reject(err.message);
			}
			return resolve(result);
		});
	});
};

module.exports = getData;
