const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const env = require('dotenv');
const api = require('./routes');
const bodyParser = require('body-parser');
const eventsRoute = require('./routes/events');
const app = express();
const configs = require('./configs');

// config
env.config();
const port = process.env.PORT || 3000;

app.use(logger('dev'));
// Add headers
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	res.setHeader('Access-Control-Allow-Headers', '*');
	res.setHeader('Access-Control-Allow-Credentials', false);
	next();
});
// create cors
app.use(cors());
app.use(express.json());
// body-passer
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// middleware
app.use('/api', api);

app.get('/', (req, res) => {
	const requestQuery = req.query;
	res.status(200).json(requestQuery);
});
// listen on port
app.listen(port, () => {
	console.log(`listening on ${port}`);
});

app.use((req, res) => {
	return res.status(400).json({
		success: false,
		error: {
			message: 'Unable to locate the request resource',
			code: 400,
		},
	});
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
	// cusstom handle errors

	// handle OAuth error
	if (!req.user) {
		return res.status(500).json({
			success: false,
			error: err,
		});
	}
});

module.exports = app;
