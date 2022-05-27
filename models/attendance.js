const query = require('../services/query-helper');
const queries = require('../queries/queryModal');
const Member = require('./member');

class Attendance {
	constructor(attendance) {
		this.memberId = attendance.memberId;
		this.eventId = attendance.eventId;
	}
	static get(attendance, callback) {}
	static async set(attendance, callback) {
		let valid = await this.checkValidId(attendance.member_id, attendance.event_id).then(
			(err) => {
				if (err) {
					return err;
				}
				return false;
			}
		);
		console.log(valid);
		if (!valid) {
			return callback(valid, false);
		}
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

	static async checkValidId(memberId, eventId) {
		let validMemberId = await query
			.getData(queries.getUserById, [memberId])
			.then((data) => data[0])
			.catch((err) => {
				return Error("Member id doesn't exist");
			});
		let validEventId = await query
			.getData(queries.getEventById, [eventId])
			.then((data) => data[0])
			.catch((err) => {
				return Error("event id doesn't exist");
			});
		if (!validEventId) {
			return Error("Member id doesn't exist");
		}
		if (!validMemberId) {
			console.log(validMemberId);
			return Error("Member id doesn't exists");
		}
		let isAttend = await query
			.getData(queries.getAttendance, [validMemberId, validEventId])
			.then((result) => {
				if (result[0]) {
					return Error('Already checked attendance');
				}
			})
			.catch((err) => {
				return false;
			});
		return isAttend;
	}
}
module.exports = Attendance;
