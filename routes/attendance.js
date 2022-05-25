const express = require('express');
const setAttendance = require('../controllers/attendanceController');

const router = express.Router();

router.post('/', setAttendance);

module.exports = router;
