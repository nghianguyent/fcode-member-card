const express = require('express');
const services = require('../services');

const router = express.Router();

router.use('/google', services.passportInit);

router.get('/', (req, res) => {
	const requesBody = req.body;
	// console.log(req.body);
	res.status(400).json(requestBody);
});

module.exports = router;
