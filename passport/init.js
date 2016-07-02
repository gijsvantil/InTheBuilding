const login = require('./login');
const signup = require('./signup');
const db = require('../models/database');

module.exports = (passport) => {
    // Serialize sessions
    passport.serializeUser( (user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser( (id, done) => {
        console.log(id)
        db.coworker.find({where: {id: id}
    }).then(
            (user) => { done(null, user) }, 
            (err) => { done(err, null) }
        );
    });

    // Setting up Passport Strategies for Login and SignUp/Registration
    login(passport);
    signup(passport);

}