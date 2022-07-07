const e = require('express');
const express = require('express');
const attendanceController = require('../controllers/attendanceController');

const router = express.Router();
router.post('/', attendanceController.setAttendance);
router.get('/', attendanceController.getAttendance);
router.get('/members', attendanceController.getAllMemberAttendance);
router.put('/', attendanceController.updateAttendanceStatus);
module.exports = router;

/**
 * @swagger
 * paths:
 *  /api/check-attendance?member_id={member_id}&event_id={event_id}:
 *      get:
 *          tags: [check attendance]
 *          summary: get a member status in an event
 *          parameters:
 *              - $ref: '#/components/parameters/AuthorizedHeader'
 *              - $ref: '#/components/parameters/EventIdQuery'
 *              - $ref: '#/components/parameters/MemberIdQuery'
 *          responses:
 *              '200':
 *                  description: successful
 *                  content:
 *                      application/json:
 *                          schema:
 *                              allOf:
 *                                  - $ref: '#/components/schemas/ResponseSuccess'
 *                                  - type: object
 *                                    properties:
 *                                      data:
 *                                          $ref: '#/components/schemas/MemberStatus'
 *  /api/check-attendance:
 *      post:
 *          tags: [check attendance]
 *          summary: check attendance for a user
 *          parameters:
 *              - $ref: '#/components/parameters/AuthorizedHeader'
 *          requestBody:
 *              description: give the attendance schema to check attendance
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/MemberStatus'
 *          responses:
 *              '200':
 *                  description: successful
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/ResponseSuccess'
 *      put:
 *          tags: [check attendance]
 *          summary: update attendance status of a member in an event
 *          parameters:
 *              - $ref: '#/components/parameters/AuthorizedHeader'
 *          requestBody:
 *              description: give the attendance schema to check attendance
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/MemberStatus'
 *          responses:
 *              '200':
 *                  description: successful
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/ResponseSuccess'
 *  /api/check-attendance/members?event_id={event_id}:
 *      get:
 *          tags: [check attendance]
 *          summary: get all members status in an events
 *          parameters:
 *              - $ref: '#/components/parameters/AuthorizedHeader'
 *              - $ref: '#/components/parameters/EventIdQuery'
 *          responses:
 *              '200':
 *                  description: successful
 *                  content:
 *                      application/json:
 *                          schema:
 *                              allOf:
 *                                  - $ref: '#/components/schemas/ResponseSuccess'
 *                                  - type: object
 *                                    properties:
 *                                      data:
 *                                          $ref: '#/components/schemas/MembersStatus'
 * components:
 *  parameters:
 *      MemberIdQuery:
 *          in: query
 *          name: member_id
 *          required: true
 *          schema:
 *            type: string
 *      EventIdQuery:
 *          in: query
 *          name: event_id
 *          required: true
 *          schema:
 *              type: string
 *  schemas:
 *      MemberStatus:
 *          type: object
 *          properties:
 *              member_id:
 *                  type: string
 *                  example: 'SE161180'
 *              event_id:
 *                  type: string
 *                  example: '1653496208366'
 *              status:
 *                  type: string
 *                  example: 'attended'
 *      MembersStatus:
 *          type: array
 *          items:
 *              $ref: '#/components/schemas/MemberStatus'
 */
