const express = require('express');
const controller = require('../controllers/eventsController');

const router = express.Router();
// router.use('/');
router.route('/').get(controller.getAllEvents).post(controller.addEvent);
router
	.route('/:eventId')
	.get(controller.getEvent)
	.put(controller.updateEvent)
	.delete(controller.deleteEvent);

module.exports = router;
