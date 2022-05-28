const express = require('express');
const session = require('express-session');
// const session = require('express-session');
const passport = require('passport');
// const md5 = require('md5');
const db = require('../query-helper');
const configs = require('../../configs');
const jwt = require('../../utilities/jwt');
const {findUser} = require('./helpers');
const queryModal = require('../../queries/queryModal');
// create strategy google
let GoogleStrategy = require('passport-google-oauth20').Strategy;
const router = express.Router();
const redirectUrl = configs.HOST_URL + '/login';
// router.use(passport.initialize()); // initializes Passport
router.use(
	session({
		secret: 'cats',
		resave: false,
		saveUninitialized: false,
	})
);
router.use(passport.initialize()); // initializes Passport
router.use(passport.session()); // alter the req object and change the ‘user’ value that is currently the session id (from the client cookie) into the true deserialized user object.

// serialize user to session
passport.serializeUser((user, done) => {
	done(null, user);
});
// deserialize user to session
passport.deserializeUser((user, done) => {
	done(null, user);
});

// redirect to google logger
passport.use(
	// create new strategy
	new GoogleStrategy(
		{
			clientID: configs.GOOGLE_CLIENT_ID,
			clientSecret: configs.GOOGLE_CLIENT_SECRET,
			callbackURL: configs.SERVER_URL + '/api/auth/google/callback',
		}, // verify function when successfully getting user profile
		async function (accessToken, refreshToken, profile, done) {
			const sql = queryModal.getUserByEmail;

			// // const userProfile = null;
			// console.log(profile.email);
			db.getPool().query(sql, [profile._json.email, profile._json.email], (err, result) => {
				if (err) return done(err);
				if (result) {
					return done(null, profile); // this callback will return exactly one profile that is used to verify
				}
				return done(null, false); // if profile error or not the same will occur the verification false
			});
			return done(null, profile);
			// console.log(profile);
		}
	)
);
// routing to google login
router.use(
	'/',
	passport.authenticate('google', {
		scope: ['email', 'profile'],
	})
);
// callback after successful login
router.use(
	'/callback',
	passport.authenticate('google', {
		failureRedirect: '/',
	}),
	(req, res) => {
		const userEmail = req.user.emails[0].value;
		findUser(userEmail)
			.then((token) => {
				// response json
				// res.status(200).json({
				// 	status: 200,
				// 	message: 'success login',
				// 	data: {
				// 		token,
				// 	},
				// });
				res.redirect(redirectUrl + `?success=true&token=${token}`); // redirect with token in query
				res.end();
			})
			.catch((error) => {
				// response json
				// res.status(401).json({
				// 	status: 401,
				// 	message: error.message,
				// })
				console.log(error);
				return res.redirect(redirectUrl + `?success=false&message=${error.message}`); // redirect with error message in query
				res.end();
			});
	}
);

module.exports = router;
