const express = require('express');
const app = express();
const port = 8118;
const bodyParser = require('body-parser');

const mysql      = require('mysql');
const connection = mysql.createConnection({
    host     : 'xxx',
    user     : 'xxx',
    password : 'xxx',
    database : 'xxx'
});

connection.connect(function (err) {
    if (err) {
        console.log("Connect database failed");
        return;
    }
    console.log('connected as id ' + connection.threadId);
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.post('/api/support', function (req, res) {
    let request = req.body;
    let content = request.content;
    if(content === undefined || content === null) {
        res.send({code: 1, message: "Vui lòng truyền đủ prameters"});
        return;
    }

    connection.query('INSERT INTO support SET ?', {content: content}, function (error, results, fields) {
        if (error) throw error;
        console.log("insert support id: " + results.insertId);
        res.send({code: 0, message: "Thành công"});
    });
});

app.post('/api/device/android', function (req, res) {
    let request = req.body;
    let androidId = request.androidId;
    if(androidId === undefined || androidId === null) {
        res.send({code: 1, message: "Vui lòng truyền đủ prameters"});
        return;
    }

    connection.query('SELECT * FROM device WHERE ?', {android_id: androidId}, function (error, results, fields) {
        if (error) throw error;

        if(results.length == 0) {
            connection.query('INSERT INTO device SET ?', {android_id: androidId}, function (error, results, fields) {
                if (error) throw error;
                console.log("insert support id: " + results.insertId);
                res.send({code: 0, message: "Thành công"});
            });
        }
        else {
            res.send({code: 0, message: "Thành công"});
        }
    });
    // connection.query('INSERT INTO device SET ?', {android_id: androidId}, function (error, results, fields) {
    //     if (error) throw error;
    //     console.log("insert support id: " + results.insertId);
    //     res.send({code: 0, message: "Thành công"});
    // });
});

app.listen(port, function (error) {
    if (error) {
        console.log(error);
        return;
    }
    console.log("server start : " + port);
});