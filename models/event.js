const pool = require('../services/query-helper').getPool();
const queries = require('../queries/queryModal');
class Event {
	constructor(event) {
		this.id = Date.now();
		this.name = event.name;
		this.startDate = event.start_date;
		this.endDate = event.end_date;
		this.description = event.description;
		this.startTime = event.start_time;
		this.endTime = event.end_time;
		this.status = event.status;
		this.semester = event.semester;
		this.location = event.location;
	}

	static getAll = (result) => {
		pool.query(queries.getEvent, (err, res) => {
			if (err) return result(err, null);
			return result(null, res);
		});
	};

	static add = (event, result) => {
		const query = queries.insertEvent;
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
				event.location,
			],
			(err, res) => {
				if (err) result(err, null);
				else result(null, res);
			}
		);
	};

	static get = (id, result) => {
		pool.query(queries.getEventById, [id], (err, res) => {
			if (err) return result(err, null);
			return result(null, res);
		});
	};

	static set = (id, event, result) => {
		const query = queries.updateEvent;
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
				event.location,
				id,
			],
			(err, res) => {
				if (err) result(err, null);
				else result(null, res);
			}
		);
	};

	static remove = (id, result) => {
		pool.query(queries.deleteEvent, [id], (err, res) => {
			if (err) return result(err, null);
			else return result(null, res);
		});
	};
}

module.exports = Event;
