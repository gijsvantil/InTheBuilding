const express = require('express');
const router = express.Router();
const db = require('../models/database');

module.exports = function(passport){

// GET that listens on '/' and renders the index page
 	router.get('/', function(req, res) {
    	res.render('index');
    });

	return router;
}