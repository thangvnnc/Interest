const express = require('express');
const app = express();
const port = 8118;
const bodyParser = require('body-parser');

const mysql      = require('mysql');
const connection = mysql.createConnection({
    host     : '103.7.40.108',
    user     : 'tinhlaisuat',
    password : 'thang01652608118',
    database : 'zadmin_tinhlaisuat'
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

app.listen(port, function (error) {
    if (error) {
        console.log(error);
        return;
    }
    console.log("server start : " + port);
});