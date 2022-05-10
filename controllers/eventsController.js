const Event = require('../models/event');

const getAllEvents = (req, res) => {
	Event.getAll((err, events) => {
		if (err)
			res.send({
				status: 500,
				message: err.message,
			});
		else
			res.json({
				status: 200,
				message: 'success',
				data: events,
			});
	});
};

const addEvent = (req, res) => {
	const event = new Event(req.body);
	Event.add(event, (err, result) => {
		if (err)
			res.send({
				status: 500,
				message: err.message,
			});
		else
			res.json({
				status: 200,
				message: 'success',
			});
	});
};

const getEvent = (req, res) => {
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
			res.json({
				status: 200,
				message: 'success',
				data: event[0],
			});
	});
};

const updateEvent = (req, res) => {
	const event = new Event(req.body);
	Event.set(req.params.eventId, event, (err, result) => {
		if (err)
			res.send({
				status: 500,
				message: err.message,
			});
		else
			res.json({
				status: 200,
				message: 'success',
			});
	});
};

const deleteEvent = (req, res) => {
	Event.remove(req.params.eventId, (err, result) => {
		if (err)
			res.send({
				status: 500,
				message: err.message,
			});
		else
			res.json({
				status: 200,
				message: 'success',
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
