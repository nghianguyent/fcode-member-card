/* eslint-disable prettier/prettier */
const express = require('express');

const router = express.Router();

/* GET users listing. */

router.get('/', (req, res) => {
	res.send('respond with a resource');
});

router.get('/:id', (req, res) => {
	res.send(`User get successful ${  req.params.id}`);
})

module.exports = router;