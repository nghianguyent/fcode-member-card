const pool = require('../utilities/db').getPool();

const getEvents = (callback) => {
	pool.query('SELECT * FROM event ORDER BY id DESC', callback);
};

const addEvent = (name, date, description, startTime, endTime, status, semester, callback) => {
	const query = 'INSERT INTO event VALUES(?,?,?,?,?,?,?,?)';
	pool.query(
		query,
		[Date.now(), name, date, description, startTime, endTime, status, semester],
		callback
	);
};

const updateEvent = (id, name, date, description, startTime, endTime, status, semester, callback) => {
	const query =
		'UPDATE event SET name=?, date=?, description=?,' +
		'start_time=?, end_time=?, status=?, semester=?' +
		'WHERE id=?';
	pool.query(
		query,
		[name, date, description, startTime, endTime, status, semester, id],
		callback
	);
};

const deleteEvent = (id, callback) => {
	pool.query('DELETE FROM event WHERE id=?', [id], callback);
};

module.exports = {
	getEvents,
	addEvent,
	updateEvent,
	deleteEvent,
};
