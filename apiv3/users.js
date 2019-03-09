const express = require('express');
const crypto = require('crypto');
const router = express.Router();
const connection = require('./database');
const secret = 'aBcXyZ';
const Errors = require('./errors');
const err = new Errors();

function createSha256(password) {
    let hash = crypto.createHash('sha256');
    hash.update(secret + password);
    return hash.digest('hex');
}

router.post('/register', function (req, res) {
    let request = req.body;
    let username = request.username;
    let password = request.password;

    if (username === undefined || username === null || password === null || password === null) {
        res.send(err.PARAMS);
        return;
    }

    // Mã hóa pass
    password = createSha256(request.password);

    connection.query('SELECT * FROM users WHERE ?', {username: username}, function (error, results, fields) {
        if (error) throw error;

        if (results.length !== 0) {
            res.send(err.EXIST);
            return;
        }
        connection.query('INSERT INTO users SET ?', {
                username: username,
                password: password,
            },
            function (error, results, fields) {
                if (error) throw error;
                res.send(err.OK);
            });

    });
});


router.post('/sign-in', function (req, res) {
    let request = req.body;
    let username = request.username;
    let password = request.password;

    if (username === undefined || username === null || password === null || password === null) {
        res.send(err.PARAMS);
        return;
    }

    // Mã hóa pass
    password = createSha256(request.password);

    connection.query('SELECT * FROM users WHERE ?', {username: username, password: password}, function (error, results, fields) {
        if (error) throw error;

        if (results.length === 0) {
            res.send(err.NOT_EXIST);
            return;
        }

        // Lưu session user
        req.user = results[0];
        res.send(err.OK);
    });
});

module.exports = router;