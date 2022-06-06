const express = require('express');
const auth = require('./auth');
const events = require('./events');
const user = require('./user');
const attendance = require('./attendance');
const swagger = require('./swagger');
const router = express.Router();

router.use('/auth', auth);
router.use('/user', user);
router.use('/events', events);
router.use('/api-docs', swagger);
router.use('/check-attendance', attendance);
module.exports = router;
