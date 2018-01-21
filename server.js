var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(path.join(__dirname, './dist/')));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/dist/npro_taikang.html');
});

app.listen(3000);