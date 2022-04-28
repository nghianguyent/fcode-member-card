const express = require('express');
const session = require('express-session');
const passport = require('passport');
const env = require('dotenv');

const router = express.Router();

env.config();

const GoogleStrategy = require('passport-google-oauth2').Strategy;

const hostURL = 'http://localhost:3000';
const callbackURL = `${hostURL}/auth/google/callback`;

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL,
		}, // verify function passed, all gotten field will be verified here
		(request, accessToken, refreshToken, profile, cb) => {
			console.log('=============== google strategy =============================');
			console.log(profile);

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
	async (req, res) => {
		console.log('=============== callback sucess =============================');
		res.send('successful');
	}
);
module.exports = router;
