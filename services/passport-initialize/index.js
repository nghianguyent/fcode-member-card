const express = require('express');
// const session = require('express-session');
const passport = require('passport');
// const md5 = require('md5');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const db = require('../database');
const config = require('../../configs/index');

const router = express.router();

router.use(passport.initialize()); // initialises Passport
router.use(passport.session()); // alter the req object and change the ‘user’ value that is currently the session id (from the client cookie) into the true deserialized user object.

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});

passport.use(
	new GoogleStrategy(
		{
			clientID: config.GOOGLE_CLIENT_ID,
			clientSecret: config.GOOGLE_CLIENT_SECRET,
			callbackURL: `${config.HOST_URL}/auth/google/callback`,
		},
		function (accessToken, refreshToken, profile, done) {
			// console.log(profile)
			console.log('=============== google strategy =============================');
			const sql = 'SELECT * FROM member WHERE school_mail = ?';
			// const userProfile = null;
			// return done(null, false);
			db.getPool().query(sql, [profile.email], (err, result) => {
				if (err) return done(err);
				if (result[0]) {
					return done(null, result[0]);
				}
				return done(null, false);
			});
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
	}),
	(req, res) => {
		console.log(req.user);
		res.status(200).json(req.user);
	}
);

module.exports = router;
