const express = require('express');
const auth = require('./auth');
const events = require('./events');
const user = require('./user');
const attendance = require('./attendance');
const swagger = require('./swagger');
const attendanceController = require('../controllers/attendanceController');
const router = express.Router();

/**
 * @swagger
 * components:
 *  parameters:
 *      AuthorizedHeader:
 *          in: header
 *          name: token
 *          required: true
 *          schema:
 *            type: string
 *  responses:
 *      Unauthorized:
 *          description: unauthorized token
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/Error"
 *                      example:
 *                          status: 403
 *                          message: "false to check attendance, jwt is not valid"
 *  schemas:
 *      ResponseSuccess:
 *          type: object
 *          properties:
 *              status:
 *                  type: integer
 *                  example: 200
 *              message:
 *                  type: string
 *                  example: "success"
 */
router.use('/auth', auth);
router.use('/user', user);
router.use('/events', events);
router.use('/api-docs', swagger);
router.use('/check-attendance', attendance);
module.exports = router;
