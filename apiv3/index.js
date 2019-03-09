'use strict';
const express = require('express');
const router = express.Router();
const users = require('./Users/users');
const funcs = require('./Funcs/funcs');

router.use('/users', users);
router.use('/funcs', funcs);

module.exports = router;