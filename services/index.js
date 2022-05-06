const db = require('./query-helper').getPool();
const passportInit = require('./passport-initialize');

module.exports = {
	db,
	passportInit,
};
