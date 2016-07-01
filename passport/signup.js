var LocalStrategy = require('passport-local').Strategy;
var db = require('../models/database');
var bCrypt = require('bcrypt');

module.exports = (passport) => {
// Setting up new signup strategy with Passport
    passport.use('signup', new LocalStrategy({
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
// Note to self: username refers to email field in signup.pug
        (req, username, password, done) => {
            findOrCreateUser = () => {
                // Check if emailaddress matches with one of the emailaddressen in db
                db.coworker.find({ where: {'email' :  username }}).then((user) => {
                    // If user already exists, show message
                    if (user) {
                        console.log('User already exists with emailaddress: '+ username);
                        return done(null, false, req.flash('message','User Already Exists'));
                    } else {
                        // If there is no user with that email, create the user
                        console.log('cant find user, must create')
                        // Save the user in db
                        db.coworker.create({
                            'firstname': req.body.firstname,
                            'lastname': req.body.lastname,
                            'organisation': req.body.organisation,
                            'email': username,
                            'password': createHash(password),
                            'telephone': req.body.telephone,
                            'location': req.body.location
                        }).then((user) => {
                            console.log('User Registration successful: ' + username);    
                            return done(null, user);
                        });
                    }
                });
            };

            process.nextTick(findOrCreateUser);
        })
    );
    // Generates hash using bCrypt
    var createHash = (password) => {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    }

}