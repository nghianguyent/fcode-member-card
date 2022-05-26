const query = require('../services/query-helper');
const queries = require('../queries/queryModal');

class Attendance {
	constructor(attendance) {
		this.memberId = attendance.memberId;
		this.eventId = attendance.eventId;
	}

	static get(attendance, callback) {}
	static set(attendance, callback) {
		query
			.setData(queries.insertAttendance, [Object.values(attendance)])
			.then((result) => {
				if (result) {
					return callback(null, true);
				}
				return callback(null, false);
			})
			.catch((err) => {
				return callback(err, false);
			});
	}
	static addPoint(attendance, callback) {}
	static minusPoint(attendance, callback) {}
}
module.exports = Attendance;
