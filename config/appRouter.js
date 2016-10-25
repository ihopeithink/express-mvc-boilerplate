var express = require('express');

var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var UserRepo = require('../repositories/TblusersRepository.js');
var bcrypt = require('bcryptjs');
passport.use(new Strategy(
	function (username, password, done) {

		UserRepo.getUserByUsername(username).then(function (user) {
		    if (user == null) {
			return done(null, false, {errorMessage: 'Incorrect credentials.'})
		    }
		    
		    var hashedPassword = bcrypt.hashSync(password, user.salt)
		    
		    if (user.password === hashedPassword) {
			return done(null, user)
		    }
		    
		    return done(null, false, {errorMessage: 'Incorrect credentials.'})
		})


	}));



passport.serializeUser(function (user, cb) {
    cb(null, user.id);
});

passport.deserializeUser(function (id, done) {

    UserRepo.getUserById(id).then(function (user) {
	if (user == null) {
	    done(new Error('Wrong user id.'))
	}

	done(null, user)
    })

});

var app = express();

app.use(passport.initialize());
app.use(passport.session());


var routes = require(__dirname + '/../routes/dashboard');
var users = require(__dirname + '/../routes/users');
app.use('/dashboard', routes);
app.use('/users', users);
app.get('/', function (req, res, next) {
res.redirect('/users/login');
});

module.exports = app;
