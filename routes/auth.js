const express = require('express');
const services = require('../services');

const router = express.Router();

router.use('/google', services.passportInit);

module.exports = router;
