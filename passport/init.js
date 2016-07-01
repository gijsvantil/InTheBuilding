const login = require('./login');
const signup = require('./signup');
const db = require('../models/database');

module.exports = function(passport){
    // Serialize sessions
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        db.coworker.find({where: {id: id}}).then(
            function(user){ done(null, user) },
            function(err){ done(err, null) }
        );
    });

    // Setting up Passport Strategies for Login and SignUp/Registration
    login(passport);
    signup(passport);

}