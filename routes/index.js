const express = require('express');
const router = express.Router();
const db = require('../models/database');

let isAuthenticated = (req, res, next) => {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/');
}

module.exports = (passport) => {

// GET that listens on '/' and renders the index page
 	router.get('/', (req, res) => {
    	res.render('index');
    });
// POST that listens on '/login'
 	router.post('/login', passport.authenticate('login', {
 		successRedirect: '/home',
 		failureRedirect: '/',
 		failureFlash : true  
 	}));

// GET that listens on '/signup' and renders the register page
	router.get('/signup', (req, res) =>{
		res.render('signup',{message: req.flash('message')});
	});

// POST that listens on '/signup'
	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/home',
		failureRedirect: '/',
		failureFlash : true , 
	}));

// GET that listens on '/home' and renders the full version of the home page
	router.get('/home', isAuthenticated, function(req, res){
		res.render('home', { user: req.user });
	});

// GET that listens on '/signout' and destroys session then redirects to '/'
	router.get('/signout', (req, res) => {
		req.logout();
		res.redirect('/');
	});

	return router;
}