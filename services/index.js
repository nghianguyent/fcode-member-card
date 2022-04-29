const db = require('./database').getPool();
const passportInit = require('./passport-initialize');

module.exports = {
	db,
	passportInit,
};
