const express = require('express');
const router = express.Router();
const db = require('../models/database');
const Sequelize = require('sequelize');
const moment = require('moment');

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

// GET that listens on '/' and renders the landing page
router.get('/', (req, res) => {
	res.render('landing');
});

// GET that listens on '/' and renders the index page with login form
router.get('/login', (req, res) => {
	res.render('index');
});

// POST that listens on '/login'
router.post('/login', passport.authenticate('login', {
	successRedirect: '/home',
	failureRedirect: '/login',
	failureFlash : true
}));

// GET that listens on '/signup' and renders the register page
router.get('/signup', (req, res) =>{
	res.render('signup',{message: req.flash('message')});
});

// POST that listens on '/signup'
router.post('/signup', passport.authenticate('signup', {
	successRedirect: '/home',
	failureRedirect: '/signup',
	failureFlash : true , 
}));
// GET that listens on '/home' and renders the home page
router.get('/home', isAuthenticated, (req, res) => {
	db.post.findAll({
		include: [db.coworker, {model: db.comment, include: [db.coworker] }]
	}).then((posts)=>{
		// console.log(posts[0].dataValues.comments)
		let post =posts.map((post) => {
			let posttime=post.dataValues.createdAt
			let commenttime=post.dataValues.comments.createdAt
			return {
				id: post.dataValues.id,
				body: post.dataValues.body,
				time: moment(posttime).format('LLL'),
				location: post.dataValues.location,
				coworker: post.dataValues.coworker,
				comments: post.dataValues.comments,
				commenttime: moment(commenttime).format('LLL')
			}	

		})
		res.render('home', {
			user: req.user,
			posts: post
		});
	});
});
// POST that listens on '/post' and saves a post to the database
router.post('/post', isAuthenticated, (req,res)=>{
	console.log(req.user.id)
	db.coworker.findOne({
		where: {
			id: req.user.id
		}
	}).then((user) => {
		user.update({
			location: req.body.location
		}),
		user.createPost({
			body: req.body.body,
			location: req.body.location
		});
	});
	res.redirect("/home")
});

//POST: listens on '/comment' and creates new comment
router.post('/comment', isAuthenticated, (req,res)=>{
	console.log(req.body)
	// Promise.all means 'Do everything in this array before continueing to the then'
	Promise.all([
		db.comment.create({
			body: req.body.body
		}),
		db.coworker.findOne({
			where: {
				id: req.user.id
			}
		}),
		db.post.findOne({
			where:{
				id: req.body.id
			}
		}),
		]).then(function(promiseResult){
			promiseResult[0].setCoworker(promiseResult[1]);
			promiseResult[0].setPost(promiseResult[2])
		}).then(function(){
			res.redirect('/home')
	})

})

router.get('/about', isAuthenticated, (req,res)=>{
	res.render('about')
})

// GET that listens on '/signout' and destroys session then redirects to '/'
router.get('/signout', (req, res) => {
	req.logout();
	res.redirect('/');
});

	return router;
}