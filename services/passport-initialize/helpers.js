const db = require('../query-helper');
const configs = require('../../configs');
const jwt = require('../../utilities/jwt');

const findUser = (userEmail) => {
	// using promise to send back token or errors
	const sql = 'SELECT * FROM member WHERE school_mail = ? OR personal_mail = ?';
	return db
		.getData(sql, [userEmail, userEmail])
		.then(async (result) => {
			const user = result[0];
			if (!user) {
				throw new Error("this user doesn't exit");
			}
			const token = await jwt.generateToken(
				{
					id: user.id,
					memberId: user.member_id,
					personalMail: user.personal_mail,
				},
				configs.JWT_SECRET,
				'1h'
			);
			return token;
		})
		.catch((err) => {
			throw err;
		});
};

module.exports = {
	findUser,
};
