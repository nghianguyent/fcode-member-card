const express = require('express');
const controller = require('../controllers/eventsController');

const router = express.Router();

router.route('/').get(controller.getAllEvents).post(controller.addEvent);
router
	.route('/:eventId')
	.get(controller.getEvent)
	.put(controller.updateEvent)
	.delete(controller.deleteEvent);

module.exports = router;

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
 *                              allOf:
 *                                  - $ref: '#/components/schemas/ResponseSuccess'
 *                                  - type: object
 *                                    properties:
 *                                      data:
 *                                          $ref: '#/components/schemas/Events'
 *              '403':
 *                  $ref: '#/components/responses/Unauthorized'
 *      post:
 *          tags: [Events]
 *          summary: add an event
 *          parameters:
 *              - $ref: '#/components/parameters/AuthorizedHeader'
 *          requestBody:
 *              description: add the event information
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/EventAdding'
 *          responses:
 *              '200':
 *                  description: successful
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/ResponseSuccess'
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
 *                              allOf:
 *                                  - $ref: '#/components/schemas/ResponseSuccess'
 *                                  - type: object
 *                                    properties:
 *                                      data:
 *                                          $ref: '#/components/schemas/Event'
 *      put:
 *          tags: [Events]
 *          summary: update an event
 *          parameters:
 *              - $ref: '#/components/parameters/AuthorizedHeader'
 *              - $ref: '#/components/parameters/EventIdPath'
 *          requestBody:
 *              description: add the event information
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/EventAdding'
 *          responses:
 *              '200':
 *                  description: successful
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/ResponseSuccess'
 *      delete:
 *          tags: [Events]
 *          summary: delete an event
 *          parameters:
 *              - $ref: '#/components/parameters/AuthorizedHeader'
 *              - $ref: '#/components/parameters/EventIdPath'
 *          responses:
 *              '200':
 *                  description: successful
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/ResponseSuccess'
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
 *      EventAdding:
 *          type: object
 *          properties:
 *              name:
 *                  type: string
 *                  example: "test"
 *              start_date:
 *                  type: string
 *                  example: "2022-12-12"
 *              end_date:
 *                  type: string
 *                  example: "2022-12-12"
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
 *                  example: "upcomming"
 *              semester:
 *                  type: string
 *                  example: "SP2022"
 *              location:
 *                  type: string
 *                  example: "Upcoming"
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
 *          type: array
 *          items:
 *              $ref: "#/components/schemas/Event"
 */
