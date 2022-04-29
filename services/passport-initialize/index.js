const express = require('express');
const session = require('express-session');
// const session = require('express-session');
const passport = require('passport');
// const md5 = require('md5');
const db = require('../database');
const configs = require('../../configs');

const router = express.Router();

// router.use(passport.initialize()); // initializes Passport
router.use(
	session({
		secret: 'cats',
		resave: false,
		saveUninitialized: true,
	})
);
router.use(passport.session()); // alter the req object and change the ‘user’ value that is currently the session id (from the client cookie) into the true deserialized user object.

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});

let GoogleStrategy = require('passport-google-oauth20').Strategy;
passport.use(
	new GoogleStrategy(
		{
			clientID: '379611883013-fv3n90ep4g1ecc0tjtdf0t0c5jlpmhei.apps.googleusercontent.com',
			clientSecret: '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',
			callbackURL: `http://localhost:3000/api/auth/google/callback`,
		},
		function (accessToken, refreshToken, profile, done) {
			// console.log(profile)
			console.log('=============== google strategy =============================');
			const sql = 'SELECT * FROM member WHERE school_mail = ?';
			// const userProfile = null;
			db.getPool().query(sql, [profile.email], (err, result) => {
				if (err) return done(err);
				if (result[0]) {
					return done(null, profile);
				}
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
		failureMessage: true,
	}),
	(req, res) => {
		console.log('=========================== callback ===========================');

		res.status(200).json(req.user);
	}
);

module.exports = router;
