const swaggerUI = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const express = require('express');
const configs = require('../configs');
const routes = express.Router();

const options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'F-Code Member Card API',
			version: '1.0.0',
			description: 'API for F-Code Member Card, using to check in event of member in F-Code',
		},
		servers: [
			{
				url: 'http://localhost:4000',
			},
		],
	},
	apis: ['./*.js'],
};
const swaggerSpec = swaggerJsdoc(options);
routes.use('/', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

module.exports = routes;
