const express = require('express');
const crypto = require('crypto');
const router = express.Router();
const connection = require('./database');
const secret = 'aBcXyZ';

function createSha256(password) {
    let hash = crypto.createHash('sha256');
    hash.update(secret + password);
    return hash.digest('hex');
}

router.post('/register', function (req, res) {
    let request = req.body;
    let username = request.username;
    let password = createSha256(request.password);

    if (username === undefined || username === null || password === null || password === null) {
        res.send({code: 1, message: 'Vui lòng truyền đủ prameters'});
        return;
    }

    connection.query('SELECT * FROM users WHERE ?', {username: username}, function (error, results, fields) {
        if (error) { res.send(err.UNKNOWN); return;};

        if (results.length !== 0) {
            res.send({code: 2, message: 'Tài khoản đã tồn tại'});
            return;
        }
        connection.query('INSERT INTO users SET ?', {
                username: username,
                password: password,
            },
            function (error, results, fields) {
                if (error) { res.send(err.UNKNOWN); return;};
                res.send({code: 0, message: 'Thành công'});
            });

    });
});

module.exports = router;