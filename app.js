const express = require('express');
const env = require('dotenv');
const bodyParser = require('body-parser');
const eventsRoute = require('./routes/events');

const app = express();

const port = process.env.PORT || 3000;

env.config();

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// routes
eventsRoute(app);
