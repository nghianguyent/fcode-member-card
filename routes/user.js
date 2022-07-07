/* eslint-disable prettier/prettier */
const express = require('express');
const memberController = require('./../controllers/memberController');
const router = express.Router();

router.get('/:id', memberController.getUserById);
router.put('/:id/change-point', memberController.changePoint);

module.exports = router;
/**
 * @swagger
 * paths:
 *  /api/user/{id}:
 *      get:
 *          tags: [Users]
 *          summary: get an information of a user
 *          parameters:
 *              - $ref: '#/components/parameters/AuthorizedHeader'
 *              - $ref: '#/components/parameters/MemberIdPath'
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
 *                                          $ref: '#/components/schemas/Member'
 *  /api/user/{id}/change-point:
 *      put:
 *          tags: [Users]
 *          summary: update active point of a user
 *          parameters:
 *              - $ref: '#/components/parameters/AuthorizedHeader'
 *              - $ref: '#/components/parameters/MemberIdPath'
 *          requestBody:
 *              description: give a integer, if negative number, the point is minus and vice versa
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              points:
 *                                  type: integer
 *                                  example: 3
 *          responses:
 *              '200':
 *                  description: successful
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/ResponseSuccess'
 * components:
 *  parameters:
 *      MemberIdPath:
 *          in: path
 *          name: id
 *          required: true
 *          schema:
 *              type: string
 *  schemas:
 *      Member:
 *          type: object
 *          properties:
 *              id:
 *                  type: string
 *                  example: 'SE161180'
 *              member_id:
 *                  type: string
 *                  example: 'SE161180'
 *              first_name:
 *                  type: string
 *                  example: 'Nguyễn Trọng'
 *              last_name:
 *                  type: string
 *                  example: 'Nghĩa'
 *              date_of_birth:
 *                  type: string
 *                  example: '2002-12-22T17:00:00.000Z'
 *              school_mail:
 *                  type: string
 *                  example: 'nghiantse161180@gmail.com'
 *              personal_mail:
 *                  type: string
 *                  example: 'nghia14302@gmail.com'
 *              phone:
 *                  type: string
 *                  example: '0947562591'
 *              major:
 *                  type: string
 *                  example: 'null'
 *              session_year:
 *                  type: string
 *                  example: 'K16'
 *              position:
 *                  type: string
 *                  example: 'member'
 *              facebook:
 *                  type: string
 *                  example: 'https://www.facebook.com/DVIL.NTN/'
 *              portfolio_id:
 *                  type: string
 *                  example: 'null'
 *              active_point:
 *                  type: integer
 *                  example: 0
 *              avatar:
 *                  type: object
 *                  properties:
 *                      type:
 *                          type: string
 *                          example: 'Buffer'
 *                      data:
 *                          type: array
 *                          items:
 *                              type: number
 *                          example: [137,80,70,81,12]
 *
 */
