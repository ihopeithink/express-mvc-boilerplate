'use strict';

var db = require('../models');

var repo = {};

repo.getUserById = function (id) {
    return db.tblusers.findById(id);
};

repo.getUserByUsernamePassword = function (username, hashedPassword) {
    return db.tblusers.findOne({
	where: {
	    'username': username,
	    'password': hashedPassword
	}
    });
};

repo.getUserByUsername = function (username) {
    return db.tblusers.findOne({
	where: {
	    'username': username
	}
    });
};

repo.saveNewUser = function (newUser) {
    return db.tblusers.create(newUser);
};

module.exports = repo;