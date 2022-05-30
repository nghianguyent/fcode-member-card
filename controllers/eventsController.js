const Event = require('../models/event');
const jwt = require('./../utilities/jwt');
const config = require('./../configs');

const getAllEvents = (req, res) => {
	jwt.verifyToken(req.headers.token, config.JWT_SECRET)
		.then(() => {
			Event.getAll((err, events) => {
				if (err)
					res.send({
						status: 500,
						message: err.message,
					});
				else
					res.status(200).json({
						status: 200,
						message: 'success',
						data: events,
					});
			});
		})
		.catch((err) => {
			res.send({
				status: 403,
				message: err.message,
			});
		});
};

const addEvent = (req, res) => {
	jwt.verifyToken(req.headers.token, config.JWT_SECRET)
		.then(() => {
			const event = new Event(req.body);
			Event.add(event, (err, result) => {
				if (err)
					res.send({
						status: 500,
						message: err.message,
					});
				else
					res.send({
						status: 200,
						message: 'success',
					});
			});
		})
		.catch((err) => {
			res.send({
				status: 403,
				message: err.message,
			});
		});
};

const getEvent = (req, res) => {
	jwt.verifyToken(req.headers.token, config.JWT_SECRET)
		.then(() => {
			Event.get(req.params.eventId, (err, event) => {
				if (event.length == 0) {
					res.send({
						status: 404,
						message: 'cannot find event',
					});
					return;
				}
				if (err)
					res.send({
						status: 500,
						message: err.message,
					});
				else
					res.send({
						status: 200,
						message: 'success',
						data: event[0],
					});
			});
		})
		.catch((err) => {
			res.send({
				status: 403,
				message: err.message,
			});
		});
};

const updateEvent = (req, res) => {
	jwt.verifyToken(req.headers.token, config.JWT_SECRET)
		.then(() => {
			const event = new Event(req.body);
			Event.set(req.params.eventId, event, (err, result) => {
				if (err)
					res.send({
						status: 500,
						message: err.message,
					});
				else if (result.affectedRows == 0)
					res.send({
						status: 404,
						message: 'cannot find event',
					});
				else
					res.send({
						status: 200,
						message: 'success',
					});
			});
		})
		.catch((err) => {
			res.send({
				status: 403,
				message: err.message,
			});
		});
};

const deleteEvent = (req, res) => {
	jwt.verifyToken(req.headers.token, config.JWT_SECRET)
		.then(() => {
			Event.remove(req.params.eventId, (err, result) => {
				if (err)
					res.send({
						status: 500,
						message: err.message,
					});
				else if (result.affectedRows == 0)
					res.send({
						status: 404,
						message: 'cannot find event',
					});
				else
					res.send({
						status: 200,
						message: 'success',
					});
			});
		})
		.catch((err) => {
			res.send({
				status: 403,
				message: err.message,
			});
		});
};

module.exports = {
	getAllEvents,
	addEvent,
	getEvent,
	updateEvent,
	deleteEvent,
};
