const express = require('express');
const session = require('express-session');
// const session = require('express-session');
const passport = require('passport');
// const md5 = require('md5');
const db = require('../database');
const configs = require('../../configs');

require('https').globalAgent.options.rejectUnauthorized = false;

// create strategy google
let GoogleStrategy = require('passport-google-oauth20').Strategy;
const router = express.Router();

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
	new GoogleStrategy({
			clientID: '379611883013-1oou8vteivte9rhhlbhf5tkq2us1cl4e.apps.googleusercontent.com',
			clientSecret: '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',
			callbackURL: `http://localhost:3000/api/auth/google/callback`,
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
					return done(null, profile);
				}
				isAuthent = false;
				return done(null, false);
			});
			return done(null, profile);
		}
	)
);

router.use(
	'/',
	passport.authenticate('google', {
		scope: ['email', 'profile'],
	})
);

router.use(
	'/callback',
	passport.authenticate('google', {
		failureRedirect: '/',
		successRedirect: '/callback',
	}),
	(req, res) => {
		const sql = 'SELECT * FROM member WHERE school_mail = ?';
		const userEmail = req.user._json.email;
		db.getPool().query(sql, [userEmail], (err, result) => {
			if (err) return done(err);
			const user = result[0];
			if (user) {
				return res.status(200).json({
					status: 200,
					message: 'success login',
					data: {
						user,
					},
				});
			}
			return res.status(400).json({
				status: 400,
				message: 'Cannot find the user',
			});
		});
	}
);

module.exports = router;
