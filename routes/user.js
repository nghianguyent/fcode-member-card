/* eslint-disable prettier/prettier */
const express = require('express');
const memberController = require('./../controllers/memberController');
const router = express.Router();

/* GET users listing. */

router.get('/', (req, res) => {
	res.send('respond with a resource');
});

router.get('/:id', memberController.getUserById);

module.exports = router;
