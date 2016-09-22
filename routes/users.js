var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('express-flash');

var app = express();

app.use(cookieParser('secret'));
app.use(session({cookie: {amxAge: 60000}}));
app.use(flash());


var router = express.Router();
var UserRepo = require('../repositories/TblusersRepository.js');

//express.use(flash());
/* GET users listing. */
router.get('/', function (req, res, next) {
    UserRepo.getUserById(1).then(function (user) {
	res.send(user);
    });
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
		}
		return res.redirect('/');
	    });
});

module.exports = router;
