'use strict';
const express = require('express');
const router = express.Router();
const users = require('./users');
const funcs = require('./funcs');

router.use('/users', users);
router.use('/funcs', funcs);

module.exports = router;