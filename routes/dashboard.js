var express = require('express');
var router = express.Router();

router.use(function (req, res, next) {
    console.log(req.session.user);
    req.session.user = req.session.user || 0;
    if (!req.session.user) {
	return res.redirect('/users/denied');
    }
    next();
});

router.get('/', function (req, res, next) {
    res.render('dashboard');
});

module.exports = router;
