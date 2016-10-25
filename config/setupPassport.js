var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	bcrypt = require('bcryptjs'),
	UserRepo = require('../repositories/TblusersRepository.js');

module.exports = function (app) {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new LocalStrategy(
	    function (username, password, done) {
		UserRepo.getUserByLogin(username).then(function (user) {
		    if (user == null) {
			return done(null, false, {message: 'Incorrect credentials.'});
		    }

		    var hashedPassword = bcrypt.hashSync(password, user.salt);

		    if (user.password === hashedPassword) {
			return done(null, user);
		    }

		    return done(null, false, {message: 'Incorrect credentials.'});
		});
	    }
    ));

    passport.serializeUser(function (user, done) {
	done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
	UserRepo.getUserById(id).then(function (user) {
	    if (user == null) {
		done(new Error('Wrong user id.'));
	    }

	    done(null, user);
	});
    });
};