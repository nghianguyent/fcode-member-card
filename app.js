const express = require('express');
// const jwt = require('jwt');
const cors = require('cors');
const helmet = require('helmet');
const env = require('dotenv');
const api = require('./routes');

const app = express();

// const routeUser = require('./routes/users');

// config
env.config();
const port = process.env.PORT || 3000;
// connect to database

// Add headers
app.use((req, res, next) => {
	// Website you wish to allow to connect
	res.setHeader('Access-Control-Allow-Origin', '*');
	// Request methods you wish to allow
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	// Request headers you wish to allow
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	// Set to true if you need the website to include cookies in the requests sent
	// to the API (e.g. in case you use sessions)
	res.setHeader('Access-Control-Allow-Credentials', false);
	// Pass to next layer of middleware
	next();
});
// create cors
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use('/api', api);
// middleware

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
		return res.json({
			success: false,
			error: err,
		});
	}
});

module.exports = app;
