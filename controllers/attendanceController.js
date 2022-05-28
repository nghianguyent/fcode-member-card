const query = require('../services/query-helper');
const queries = require('../queries/queryModal');
const {JWT_SECRET} = require('../configs');
const Attendance = require('../models/attendance');
const jwt = require('../utilities/jwt');

const setAttendance = (req, res) => {
	const token = req.headers.token;
	const attendance = req.body;
	jwt.verifyToken(token, JWT_SECRET)
		.then(() => {
			Attendance.set(attendance, (err, result) => {
				if (err || !result) {
					res.status(200).json({
						status: 400,
						message: 'Wrong information in request. ' + (err.message || err.sqlMessage),
					});
					return;
				}
				res.status(200).json({
					status: 200,
					message: 'Successful check attendance',
					data: result,
				});
			});
		})
		.catch((err) => {
			res.status(200).json({
				status: 403,
				message: 'False to check attendance, ' + (err.message || err.sqlMessage),
			});
		});
};

const getAttendance = (req, res) => {
	const token = req.headers.token;
	const ids = req.query;
	jwt.verifyToken(token, JWT_SECRET)
		.then(() => {
			Attendance.get(ids, (err, result) => {
				if (err || !result) {
					res.status(200).json({
						status: 400,
						message: 'Wrong information in request. ' + (err.message || err.sqlMessage),
					});
					return;
				}
				res.status(200).json({
					status: 200,
					message: 'Successful check attendance',
					data: result,
				});
			});
		})
		.catch((err) => {
			res.status(200).json({
				status: 403,
				message: 'False to check attendance, ' + (err.message || err.sqlMessage),
			});
		});
};

module.exports = {
	setAttendance: setAttendance,
	getAttendance: getAttendance,
};
