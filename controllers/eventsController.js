const Event = require('../models/event');

const getAllEvents = (req, res) => {
	Event.getAll((err, events) => {
		if (err) res.send(err);
		else res.json(events);
	});
};

const addEvent = (req, res) => {
	const event = new Event(req.body);
	Event.add(event, (err, result) => {
		if (err) res.send(err);
		else res.json(result);
	});
};

const getEvent = (req, res) => {
	Event.get(req.params.eventId, (err, event) => {
		if (err) res.send(err);
		else res.json(event);
	});
};

const updateEvent = (req, res) => {
	const event = new Event(req.body);
	Event.set(req.params.eventId, event, (err, result) => {
		if (err) res.send(err);
		else res.json(result);
	});
};

const deleteEvent = (req, res) => {
	Event.remove(req.params.eventId, (err, result) => {
		if (err) res.send(err);
		else res.json(result);
	});
};

module.exports = {
	getAllEvents,
	addEvent,
	getEvent,
	updateEvent,
	deleteEvent,
};
