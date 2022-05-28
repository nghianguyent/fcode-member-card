const envPath = __dirname + '/../.env.' + process.env.NODE_ENV;
require('dotenv').config({path: envPath});
// require('dotenv').config();

const {
	MYSQL_USERNAME,
	MYSQL_PASSWORD,
	MYSQL_DATABASE,
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET,
	HOST_URL,
	SERVER_URL,
	JWT_SECRET,
	MYSQL_HOST,
} = process.env;

const connectionConfig = {
	host: MYSQL_HOST,
	user: MYSQL_USERNAME,
	password: MYSQL_PASSWORD,
	database: MYSQL_DATABASE,
};

module.exports = {
	MYSQL_USERNAME,
	MYSQL_PASSWORD,
	MYSQL_DATABASE,
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET,
	HOST_URL,
	JWT_SECRET,
	MYSQL_HOST,
	SERVER_URL,
	connectionConfig,
};
