module.exports = {
	getUserByEmail: 'SELECT * FROM member WHERE school_mail = ? or personal_mail= ?',
	getUserById: 'SELECT * FROM member WHERE id = ?',
};
