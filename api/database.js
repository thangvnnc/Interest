const mysql      = require('mysql');
const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'interest_inter'
});

connection.connect(function (err) {
    if (err) {
        console.log("Connect database failed");
        return;
    }
    console.log('connected as id ' + connection.threadId);
});

module.exports = connection;