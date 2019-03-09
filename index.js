'use strict';
const express = require('express');
const app = express();
const port = 8118;
const bodyParser = require('body-parser');
const api = require('./api/index');
const apiv2 = require('./apiv2/index');
const apiv3 = require('./apiv3/index');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', api);
app.use('/apiv2', apiv2);
app.use('/apiv3', apiv3);

app.use(express.static(__dirname + '/public'));

app.listen(port, function (error) {
    if (error) {
        console.log(error);
        return;
    }
    console.log('server start : ' + port);
});