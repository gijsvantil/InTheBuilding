const LocalStrategy = require('passport-local').Strategy;
const db = require('../models/database');
const bCrypt = require('bcrypt');

module.exports = (passport) => {

    passport.use('login', new LocalStrategy({
            passReqToCallback : true
        },
        (req, username, password, done) => { 
            // Check if a coworker with that email exists in db
            db.coworker.find({ where: {'email' :  username }}).then(
                (user) => {
            // If no such coworker exists return done
                    if (!user){
                        console.log('User Not Found with username '+username);
                        return done(null, false, req.flash('message', 'User Not found.'));                 
                    }
                    // User exists but wrong password, log the error 
                    if (!isValidPassword(user, password)){
                        console.log('Invalid Password');
                        return done(null, false, req.flash('message', 'Invalid Password')); // redirect back to login page
                    }
                    // User and password both match, return user from done method
                    // which will be treated like success
                    console.log('found user')
                    return done(null, user);
                },
                // General error handling
                function(err) {
                    return done(err);
                });

        })
    );

// bCrypt password compare
    var isValidPassword = function(user, password){
        return bCrypt.compareSync(password, user.password);
    }
    
}