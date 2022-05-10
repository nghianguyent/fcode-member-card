const express = require('express');
const auth = require('./auth');
const events = require('./events');
const user = require('./user');
const router = express.Router();

router.use('/auth', auth);
router.use('/user', user);
router.use('/events', events);
module.exports = router;
