const express = require('express');
const controller = require('../controllers/eventsController');

const router = express.Router();

/**
 * @swagger
 * paths:
 *  /api/events:
 *      get:
 *          tags: [Events]
 *          summary: get all events
 *          parameters:
 *              - $ref: '#/components/parameters/AuthorizedHeader'
 *          responses:
 *              '200':
 *                  description: successful
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Events'
 *              '403':
 *                  $ref: '#/components/responses/Unauthorized'
 *  /api/events/{event_id}:
 *      get:
 *          tags: [Events]
 *          summary: get a specific event information
 *          parameters:
 *          - $ref: '#/components/parameters/AuthorizedHeader'
 *          - $ref: '#/components/parameters/EventIdPath'
 *          responses:
 *              '200':
 *                  description: successful
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  status:
 *                                      type: integer
 *                                      example: 200
 *                                  message:
 *                                      type: string
 *                                      example: success
 *                                  data:
 *                                      $ref: '#/components/schemas/Event'
 * components:
 *  parameters:
 *      EventIdPath:
 *          in: path
 *          name: event_id
 *          required: true
 *          schema:
 *              type: string
 *      EventId:
 *          in: body
 *          name: event_id
 *          required: true
 *          schema:
 *              type: string
 *      MemberId:
 *          in: body
 *          name: member_id
 *          required: true
 *          schema:
 *              type: string
 *  schemas:
 *      Error:
 *          type: object
 *          properties:
 *              status:
 *                  type: number
 *              message:
 *                  type: string
 *
 *      Event:
 *          type: object
 *          properties:
 *              id:
 *                  type: string
 *                  example: "1653496208367"
 *              name:
 *                  type: string
 *                  example: "test"
 *              start_date:
 *                  type: string
 *                  example: "2022-12-11T17:00:00.000Z"
 *              end_date:
 *                  type: string
 *                  example: "2022-12-11T17:00:00.000Z"
 *              description:
 *                  type: string
 *                  example: "a wonderful event"
 *              start_time:
 *                  type: string
 *                  example: "21:00:00"
 *              end_time:
 *                  type: string
 *                  example: "22:00:00"
 *              status:
 *                  type: string
 *                  example: "ongoing"
 *              semester:
 *                  type: string
 *                  example: "SP2022"
 *              location:
 *                  type: string
 *                  example: "Upcoming"
 *
 *      Events:
 *          type: object
 *          properties:
 *              status:
 *                  type: integer
 *                  example: 200
 *              message:
 *                  type: string
 *                  example: "success"
 *              data:
 *                  type: array
 *                  items:
 *                      $ref: "#/components/schemas/Event"
 */
router.route('/').get(controller.getAllEvents).post(controller.addEvent);
router
	.route('/:eventId')
	.get(controller.getEvent)
	.put(controller.updateEvent)
	.delete(controller.deleteEvent);

module.exports = router;
