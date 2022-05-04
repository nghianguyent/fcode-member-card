const db = require('../database');
const configs = require('../../configs');
const jwt = require('../../utilities/jwt');

const findUser = (userEmail) => {
	// using promise to send back token or errors
	return new Promise((resolve, reject) => {
		// TODO: change conditional to login with personal_mail or school_mail
		const sql = 'SELECT * FROM member WHERE school_mail = ?';

		// check in database if the user existed
		db.getPool().query(sql, [userEmail], async (err, result) => {
			if (err) return reject(err);
			const user = result[0];
			if (!user) {
				return reject(new Error('cannot find email address'));
			}
			// return the user information
			const token = await jwt.generateToken(
				{
					user,
					// id: user.id,
					// schoolMail: user.school_mail,
					// personalMail: user.personal_mail,
				},
				configs.JWT_SECRET,
				'1h'
			);
			// console.log(token);
			return resolve(token);
			// return res.redirect(redirectUrl + `/auth?user=${token}&success=true`);
			// return res.status(200).json({
			// 	status: 200,
			// 	message: 'success login',
			// 	data: {
			// 		user,
			// 	},
			// });
			// return error if the user not exited		1
		});
		// console.log(ans);
		// res.status(200).json({
		// 	userEmail: userEmail,
		// });
		// res.redirect(redirectUrl + `?success=false`);
	});
};

module.exports = {
	findUser,
};
