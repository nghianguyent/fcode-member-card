/* eslint-disable prettier/prettier */
const express = require('express');
const memberController = require('./../controllers/memberController');
const router = express.Router();

/* GET users listing. */

router.get('/:id', memberController.getUserById);

module.exports = router;
