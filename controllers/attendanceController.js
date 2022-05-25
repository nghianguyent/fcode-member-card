const query = require('../services/query-helper');
const queries = require('../queries/queryModal');
const {JWT_SECRET} = require('../configs');
const Attendance = require('../models/attendance');
const jwt = require('../utilities/jwt');

const setAttendance = (req, res) => {
	const token = req.headers.token;
	const attendance = req.body;
	jwt.verifyToken(token, JWT_SECRET)
		.then((token) => {
			Attendance.set(attendance, (err, result) => {
				if (err || result == false) {
					console.log(false);
					res.status(200).json({
						status: 400,
						message: 'Wrong information in request. ' + err.sqlMessage,
					});
					return;
				}
				res.send(200).json({
					status: 200,
					message: 'Successful check attendance',
				});
			});
		})
		.catch((err) => {
			res.status(200).json({
				status: 403,
				message: 'False to check attendance, ' + err.sqlMessage,
			});
		});
};

module.exports = setAttendance;
