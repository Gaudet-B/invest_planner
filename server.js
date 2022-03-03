var express = require('express');
var app = express();
var port = 8000;
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.listen(port, function () {
    return console.log("Express is listening at http://localhost:".concat(port));
});
