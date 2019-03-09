'use strict';
const express = require('express');
const router = express.Router();

router.post('/support', function (req, res) {
    let request = req.body;
    let content = request.content;
    if (content === undefined || content === null) {
        res.send({code: 1, message: 'Vui lòng truyền đủ prameters'});
        return;
    }

    connection.query('INSERT INTO support SET ?', {content: content}, function (error, results, fields) {
        if (error) { res.send(err.UNKNOWN); return;};
        res.send({code: 0, message: 'Thành công'});
    });
});

router.post('/device/android', function (req, res) {
    let request = req.body;
    let androidId = request.androidId;
    if (androidId === undefined || androidId === null) {
        res.send({code: 1, message: 'Vui lòng truyền đủ prameters'});
        return;
    }

    connection.query('SELECT * FROM device WHERE ?', {android_id: androidId}, function (error, results, fields) {
        if (error) { res.send(err.UNKNOWN); return;};

        if (results.length !== 0) {
            res.send({code: 0, message: 'Thành công'});
            return;
        }
        connection.query('INSERT INTO device SET ?', {android_id: androidId}, function (error, results, fields) {
            if (error) { res.send(err.UNKNOWN); return;};
            res.send({code: 0, message: 'Thành công'});
        });
    });
});

router.post('/admod', function (req, res) {
    let request = req.body;
    let deviceId = request.deviceId;
    if (deviceId === undefined || deviceId === null) {
        res.send({code: 1, message: 'Vui lòng truyền đủ prameters'});
        return;
    }

    connection.query('SELECT * FROM admod WHERE ?', {device_id: deviceId}, function (error, results, fields) {
        if (error) { res.send(err.UNKNOWN); return;};

        if (results.length === 0) {
            connection.query('INSERT INTO admod SET ?', {
                device_id: deviceId,
                count: 1
            }, function (error, results, fields) {
                if (error) { res.send(err.UNKNOWN); return;};
                res.send({code: 0, message: 'Thành công'});
            });
        }
        else {
            let count = results[0].count;
            count++;
            connection.query('UPDATE admod SET ? WHERE ?', [{count: count}, {device_id: deviceId}], function (error, results, fields) {
                if (error) { res.send(err.UNKNOWN); return;};
                res.send({code: 0, message: 'Thành công'});
            });
        }
    });
});

module.exports = router;