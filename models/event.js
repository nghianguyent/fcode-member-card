const pool = require('../services/query-helper').getPool();

class Event {
	constructor(event) {
		this.id = Date.now();
		this.name = event.name;
		this.startDate = event.start_date;
		this.description = event.description;
		this.startTime = event.start_time;
		this.endTime = event.end_time;
		this.status = event.status;
		this.semester = event.semester;
	}

	static getAll = (result) => {
		pool.query('SELECT * FROM event ORDER BY id DESC', (err, res) => {
			if (err) return result(err, null);
			return result(null, res);
		});
	};

	static add = (event, result) => {
		const query = 'INSERT INTO event VALUES(?,?,?,?,?,?,?,?,?)';
		pool.query(
			query,
			[
				event.id,
				event.name,
				event.startDate,
				event.endDate,
				event.description,
				event.startTime,
				event.endTime,
				event.status,
				event.semester,
			],
			(err, res) => {
				if (err) result(err, null);
				else result(null, res);
			}
		);
	};

	static get = (id, result) => {
		pool.query('SELECT * FROM event WHERE id=?', [id], (err, res) => {
			if (err) return result(err, null);
			return result(null, res);
		});
	};

	static set = (id, event, result) => {
		const query =
			'UPDATE event SET name=?, start_date=?, end_date=?, description=?, ' +
			'start_time=?, end_time=?, status=?, semester=? ' +
			'WHERE id=?';
		pool.query(
			query,
			[
				event.name,
				event.startDate,
				event.endDate,
				event.description,
				event.startTime,
				event.endTime,
				event.status,
				event.semester,
				id,
			],
			(err, res) => {
				if (err) result(err, null);
				else result(null, res);
			}
		);
	};

	static remove = (id, result) => {
		pool.query('DELETE FROM event WHERE id=?', [id], (err, res) => {
			if (err) return result(err, null);
			else return result(null, res);
		});
	};
}

module.exports = Event;
