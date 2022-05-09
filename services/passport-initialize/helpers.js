const db = require('../query-helper');
const configs = require('../../configs');
const jwt = require('../../utilities/jwt');
const queryModal = require('../../queries/queryModal');

const findUser = (userEmail) => {
	// using promise to send back token or errors
	const sql = queryModal.getUserByEmail;
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
