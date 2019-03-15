'use strict';
const express = require('express');
const router = express.Router();
const users = require('./Service/users');
const funcs = require('./Service/funcs');

router.use('/users', users);
router.use('/funcs', funcs);

module.exports = router;