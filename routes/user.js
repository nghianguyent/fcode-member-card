/* eslint-disable prettier/prettier */
const express = require('express');

const router = express.Router();

/* GET users listing. */

router.get('/', (req, res) => {
	res.send('respond with a resource');
});

router.get('/:id', (req, res) => {
	res.status(200).json({
		success: true,
		message: 'Successfully get user ' + req.params.id,
		data: {
			
		}
	})
});

module.exports = router;
