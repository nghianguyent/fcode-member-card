const jwt = require('jsonwebtoken');

const generateToken = (data, secret, life) => {
	return new Promise((resolve, reject) => {
		jwt.sign(
			data,
			secret,
			{
				algorithm: 'HS256',
				expiresIn: life,
			},
			(err, token) => {
				if (err) {
					return reject(err);
				}
				return resolve(token);
			}
		);
	});
};

const verifyToken = (token, secret) => {
	return new Promise((resolve, reject) => {
		jwt.verify(token, secret, (err, token) => {
			if (err) {
				return reject(err);
			}
			return resolve(token);
		});
	});
};

module.exports = {
	generateToken: generateToken,
	verifyToken: verifyToken,
};
