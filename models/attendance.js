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
		let isNotValid = await this.checkValidId(attendance.member_id, attendance.event_id)
			.then((isNotValid) => {
				if (isNotValid) {
					return isNotValid;
				}
				return false;
			})
			.catch((err) => {
				console.error(err);
				return callback(err, false);
			});
		if (isNotValid) {
			return callback(isNotValid, false);
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
		let validMember = await query
			.getData(queries.getUserById, [memberId])
			.then((data) => data[0])
			.catch((err) => {
				return Error("Member id doesn't exist");
			});
		let validEvent = await query
			.getData(queries.getEventById, [eventId])
			.then((data) => data[0])
			.catch((err) => {
				return Error("Event id doesn't exist");
			});
		if (!validEvent) {
			return Error("Event id doesn't exist");
		}
		if (!validMember) {
			return Error("Member id doesn't exists");
		}
		let isAttend = await query
			.getData(queries.getAttendance, [validMember.id, validEvent.id])
			.then((result) => {
				if (result[0]) {
					return Error('Already checked attendance');
				}
				return false;
			})
			.catch((err) => {
				return err;
			});
		return isAttend;
	}
}
module.exports = Attendance;
