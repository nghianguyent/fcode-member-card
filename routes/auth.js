const express = require('express');
const services = require('../services');

const router = express.Router();

router.use('/google', services.passportInit);

router.get('/', (req, res) => {
	const requestQuery = req.query;
	res.status(200).json(requestQuery);
});

module.exports = router;
