const controller = require('../controllers/eventsController');

module.exports = (app) => {
	app.route('/events')
		.get(controller.getAllEvents)
		.post(controller.addEvent);
	app.route('/events/:eventId')
		.get(controller.getEvent)
		.put(controller.updateEvent)
		.delete(controller.deleteEvent);
};
