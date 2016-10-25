var express = require('express');
var bcrypt = require('bcryptjs');

var router = express.Router();
var UserRepo = require('../repositories/TblusersRepository.js');

router.get('/denied', function (req, res, next) {
    res.render('denied');
});


router.get('/logout', function (req, res, next) {
    req.session.destroy(function () {
	res.redirect('/users/login');
    });
});

router.get('/login', function (req, res, next) {
    res.render('login', {
	title: 'Login',
	layout: 'login'
    });
});

// Authenticate using our plain-object database of doom!

router.post('/login', function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    UserRepo.getUserByUsername(username).then(function (userInfo) {
	if (userInfo) {
	    var hashedPassword = bcrypt.hashSync(password, userInfo.salt);
	    UserRepo.getUserByUsernamePassword(username, hashedPassword).then(function (user) {

		if (!user) {
		    req.session.error = 'Authentication failed, please check your username and password.';
		    res.redirect('/users/login');
		} else {
		    req.session.regenerate(function () {
			req.session.user = user;
			res.redirect('/dashboard');
		    });
		}

	    }).catch(function (error) {
		req.session.error = error;
		res.redirect('/users/login');
	    });
	} else {
	    req.session.error = 'Authentication failed, please check your username.';
	    res.redirect('/users/login');
	}

    }).catch(function (error) {
	req.session.error = error;
	res.redirect('/users/login');
    });

});

router.get('/signup', function (req, res, next) {
    res.render('signup', {
	title: 'Signup',
	layout: 'login'
    });
});

router.post('/signup', function (req, res, next) {
    var username = req.body.username
    var password = req.body.password
    var password2 = req.body.password2

    if (!username || !password || !password2) {
	req.session.error = 'Please, fill in all the fields.';
	res.redirect('/users/signup');
    }

    if (password !== password2) {
	req.session.error = 'Please, enter the same password twice.';
	res.redirect('/users/signup');
    }

    var salt = bcrypt.genSaltSync(10)
    var hashedPassword = bcrypt.hashSync(password, salt)

    var newUser = {
	username: username,
	salt: salt,
	password: hashedPassword
    }

    UserRepo.saveNewUser(newUser).then(function () {
	res.redirect('/users/login')
    }).catch(function (error) {
	req.session.error = error;
	res.redirect('/users/signup')
    })
});



/* GET users listing. */
router.get('/:uid', function (req, res, next) {
    UserRepo.getUserById(req.params.uid)
	    .then(function (user) {
		if (!user)
		    throw 'Password reset request is invalid or has expired.';

		res.render('user', {user: user});
	    })
	    .catch(function (err) {
		req.session.sessionFlash = {
		    type: 'success',
		    message: err
		};
		req.session.error = err;
		return res.redirect('/');
	    });
});

module.exports = router;
