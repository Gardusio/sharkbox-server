
import passport from 'passport';
import LocalStrategy from 'passport-local'
import { authenticateRequest } from '../authService.js';

/*** Passport ***/

/** Set up authentication strategy to search in the DB a user with a matching password. **/
passport.use(new LocalStrategy(authenticateRequest));

// Serializing in the session the user object given from LocalStrategy(verify).
passport.serializeUser(function (user, callback) { // this user is id + username + name 
    callback(null, user);
});

// Starting from the data in the session, we extract the current (logged-in) user.
passport.deserializeUser(function (user, callback) { // this user is id + email + name 
    // if needed, we can do extra check here (e.g., double check that the user is still in the database, etc.)
    // e.g.: return userDao.getUserById(id).then(user => callback(null, user)).catch(err => callback(err, null));

    return callback(null, user); // this will be available in req.user
});

const authenticate = passport.authenticate('session');

export { authenticate }