var express = require('express');
var app = express();

app.get('/', f_inicio);
app.get('/login', f_login);

function f_inicio(req, res) {
    res.send('INDEX');
}

function f_login(req, res) {
    res.send('LOGIN');
}

function f_server() {
    port = server.address().port;
    console.log('port: ', port);
}

var server = app.listen(3001, f_server);