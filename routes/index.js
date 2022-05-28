const express = require('express');
const auth = require('./auth');
const events = require('./events');
const user = require('./user');
const attendance = require('./attendance');
const router = express.Router();

router.use('/auth', auth);
router.use('/user', user);
router.use('/events', events);
router.use('/check-attendance', attendance);
module.exports = router;
