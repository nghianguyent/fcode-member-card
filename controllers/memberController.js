const Member = require('./../models/member');
const jwt = require('./../utilities/jwt');
const config = require('./../configs');

const getUserById = (req, res) => {
	jwt.verifyToken(req.headers.token, config.JWT_SECRET)
		.then(() => {
			Member.getUserById(req.params.id, (err, result) => {
				if (err) return res.status(500).send(err.sqlMessage);
				if (!result)
					return res.status(200).json({
						status: 403,
						message: 'Could not find user with id ' + req.params.id,
					});
				res.status(200).json({
					status: 200,
					message: 'Successfully get user ' + req.params.id,
					data: result,
				});
			});
		})
		.catch((err) => {
			res.status(200).json({
				status: 403,
				message: 'False to get data, ' + err.sqlMessage,
			});
		});
};

module.exports = {
	getUserById: getUserById,
};
