const express = require('express');
// const jwt = require('jwt');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
const env = require('dotenv');

const login = require('./routes/google-auth');
// const routeUser = require('./routes/users');

// config
env.config();
const port = process.env.PORT || 3000;
// connect to database

// alot access from other ports
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
app.use(helmet());
app.use('/auth/google', login);

// middleware

// listen on port
app.listen(port, () => {
	console.log(`listening on ${port}`);
});

module.exports = app;
