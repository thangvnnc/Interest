'use strict';
const express = require('express');
const app = express();
const port = 8118;
const bodyParser = require('body-parser');
const api = require('./api/app');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api', api);

app.use(express.static(__dirname + '/public'));

app.listen(port, function (error) {
    if (error) {
        console.log(error);
        return;
    }
    console.log('server start : ' + port);
});