'use strict';

var db = require('../models');

var repo = {};

repo.getUserById = function (id) {
    return db.tblusers.findById(id);
};

module.exports = repo;