const express = require('express');
const bodyParser= require('body-parser')
const pg = require('pg')
const app = express();
const bcrypt = require('bcrypt');
const passport = require('passport');
const Sequelize = require('sequelize');
const session = require('express-session');
const sass = require ('node-sass');
const fs = require ('fs');
// requiring database module
const db = require('./models/database');

/// Setting PUG as view engine
app.set('views', './views');
app.set('view engine', 'pug');

// Compiling SCSS into CSS file
sass.render( {
    file: './public/css/scss/styles.scss'
}, (err, result) => { 
    console.log(result, err)
    fs.writeFile( './public/css/styles.css', result.css.toString(), ( err ) => {
        if ( err ) throw err
            console.log( 'Sass written to css' )
    });
});

// BodyParser setup
app.use(bodyParser.urlencoded({extended: true}))
// Static folder
app.use(express.static(__dirname + '/public')); 
// Initializing session
app.use(session({
	secret: 'I solemny swear that I am up to know good',
	resave: true,
	saveUninitialized: false
}));

// PASSPORT
app.use(passport.initialize());
app.use(passport.session());
const initPassport = require('./passport/init');
initPassport(passport);

 // Using the flash middleware provided by connect-flash to store messages in session
 // and displaying in templates
const flash = require('connect-flash');
app.use(flash());

// Initialize Routes
const routes = require('./routes/index')(passport);
app.use('/', routes);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Server listens on port 3000
const server = app.listen(3000, function (){
	console.log ('In The Building listening on: ' + server.address().port)
});