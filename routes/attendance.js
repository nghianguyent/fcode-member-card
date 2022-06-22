const e = require('express');
const express = require('express');
const attendanceController = require('../controllers/attendanceController');

const router = express.Router();

router.post('/', attendanceController.setAttendance);
router.get('/', attendanceController.getAttendance);
router.get('/members', attendanceController.getAllMemberAttendance);
module.exports = router;
