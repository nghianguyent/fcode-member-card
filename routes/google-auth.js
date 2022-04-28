const express = require('express');
const session = require('express-session');
const passport = require('passport');
const env = require('dotenv');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const pool = require('../utilities/db');

const router = express.Router();

env.config();

const hostURL = 'http://localhost:3000';
const callbackURL = `${hostURL}/auth/google/callback`;

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL,
		}, // verify function passed, all gotten field will be verified here, run after callback router returned
		(request, accessToken, refreshToken, profile, cb) => {
			console.log('=============== google strategy =============================');
			const sql = 'SELECT * FROM member WHERE school_mail = ?';
			// const userProfile = null;
			pool.getPool().query(sql, [profile.email], (err, result) => {
				console.log(result[0]);
			});
			return cb(null, profile);
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});

router.use(
	session({
		secret: 'cats',
		resave: false,
		saveUninitialized: true,
	})
);

router.use(passport.initialize());
router.use(passport.session());

// redirect to google login page
router.get(
	'/',
	passport.authenticate(
		'google',
		{
			scope: ['email', 'profile'], // scope for more information needed to get
		} // redirect function when successful login
	)
);

router.get(
	'/callback',
	passport.authenticate('google', {
		failureRedirect: '/',
	}),
	(req, res) => {
		console.log('=============== callback sucess =============================');
		res.send('successful');
	}
);
module.exports = router;
