const express = require('express');
const crypto = require('crypto');
const router = express.Router();
const connection = require('../DB/database');
const secret = 'aBcXyZ';
const Errors = require('../Error/errors');
const err = new Errors();

function createSha256(password) {
    let hash = crypto.createHash('sha256');
    hash.update(secret + password);
    return hash.digest('hex');
}

function authSession(req, res, next) {
    if (req.session.user === undefined) {
        res.send(err.SESSION_EXPIRE);
        return;
    }
    next();
}

router.post('/register', function (req, res) {
    let request = req.body;
    let fb = request.fb;
    let username = request.username;
    let password = request.password;
    let fullname = request.fullname;
    let phone = request.phone;
    let email = request.email;

    if (
        username === undefined || username === null
        || password === undefined || password === null
        || fullname === undefined || fullname === null
        || phone === undefined || phone === null
        || email === undefined || email === null) {
        res.send(err.PARAMS);
        return;
    }

    // Mã hóa pass
    password = createSha256(request.password);

    connection.query('SELECT * FROM users WHERE ?', {username: username}, function (error, results, fields) {
        if (error) { res.send(err.UNKNOWN); return;};

        if (results.length !== 0) {
            res.send(err.EXIST);
            return;
        }
        connection.query('INSERT INTO users SET ?', {
                fb: fb,
                username: username,
                password: password,
                fullname: fullname,
                phone: phone,
                email: email
            },
            function (error, results, fields) {
                if (error) { res.send(err.UNKNOWN); return;};
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

    connection.query('SELECT * FROM users WHERE ?', {username: username}, function (error, results, fields) {
        if (error) { res.send(err.UNKNOWN); return;};

        if (results.length === 0) {
            res.send(err.SIGNIN_INVALID);
            return;
        }

        if (password !== results[0].password) {
            res.send(err.SIGNIN_INVALID);
            return;
        }

        // Lưu session user
        req.session.user = results[0];
        res.send(err.OK);
    });
});

router.get('/sign-in', function (req, res) {
    let request = req.query;
    let username = request.username;
    let password = request.password;

    if (username === undefined || username === null || password === null || password === null) {
        res.send(err.PARAMS);
        return;
    }

    // Mã hóa pass
    password = createSha256(request.password);

    connection.query('SELECT * FROM users WHERE ?', {username: username}, function (error, results, fields) {
        if (error) { res.send(err.UNKNOWN); return;};

        if (results.length === 0) {
            res.send(err.SIGNIN_INVALID);
            return;
        }

        if (password !== results[0].password) {
            res.send(err.SIGNIN_INVALID);
            return;
        }

        // Lưu session user
        req.session.user = results[0];
        res.send(err.OK);
        return;
    });
});

router.post('/update-info', authSession, function (req, res) {
    let request = req.body;
    let user = req.session.user;

    let dataUpdate = {};
    dataUpdate.fullname = request.fullname;
    dataUpdate.phone = request.phone;
    dataUpdate.email = request.email;

    connection.query('UPDATE users SET ? WHERE ?', [dataUpdate , {id: user.id}], function (error, results, fields) {
        if (error) { res.send(err.UNKNOWN); return;};
        res.send(err.OK);
        return;
    });
});

module.exports = router;