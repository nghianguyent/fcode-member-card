/* eslint-disable prettier/prettier */
const express = require('express');
const memberController = require('./../controllers/memberController');
const router = express.Router();

/* GET users listing. */

router.get('/:id', memberController.getUserById);
router.put('/:id/change-point', memberController.changePoint);

module.exports = router;
