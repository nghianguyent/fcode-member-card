const express = require('express');
const session = require('express-session');
// const session = require('express-session');
const passport = require('passport');
// const md5 = require('md5');
const db = require('../database');
const configs = require('../../configs');
const jwt = require('../../utilities/jwt');
const {findUser} = require('./helpers');
// create strategy google
let GoogleStrategy = require('passport-google-oauth20').Strategy;
const router = express.Router();
const redirectUrl = configs.HOST_URL + '/api/auth';
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
			clientID: '379611883013-1oou8vteivte9rhhlbhf5tkq2us1cl4e.apps.googleusercontent.com',
			clientSecret: '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',
			callbackURL: configs.HOST_URL + `/api/auth/google/callback`,
			// passReqToCallback: true,
		}, // verify function when successfully getting user profile
		function (accessToken, refreshToken, profile, done) {
			// console.log(profile);
			console.log('=============== google strategy =============================');
			const sql = 'SELECT * FROM member WHERE school_mail = ?';
			// const userProfile = null;
			db.getPool().query(sql, [profile.email], (err, result) => {
				if (err) return done(err);
				if (result) {
					// console.log(result);
					console.log('db');
					return done(null, profile); // this callback will return exactly one profile that is used to verify
				}
				isAuthent = false;
				return done(null, false); // if profile error or not the same will occur the verification false
			});
			return done(null, profile);
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
		successRedirect: '/callback',
	}),
	async (req, res) => {
		const userEmail = req.user._json.email;
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
				res.redirect(redirectUrl + `/auth?success=true&token=${token}`); // redirect with token in query
			})
			.catch((error) => {
				// response json
				// res.status(401).json({
				// 	status: 401,
				// 	message: error.message,
				// })
				res.redirect(redirectUrl + `?success=false&message=${error.message}`); // redirect with token in query
			});
	}
);

module.exports = router;
