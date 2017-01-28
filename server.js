const express = require('express');
const path = require('path');
var app = express();

const fs = require('fs');
const assert = require('assert');

const multer = require('multer');
var upload = multer({dest: 'uploads/'});

var port = process.env.PORT || 5000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/', function (request, response) {
    response.render('index');
});

app.post('/get-size', upload.single('file'), function (request, response, next) {
    response.json({
        'size': request.file.size
    });
        
    fs.unlink('./uploads/' + request.file.filename, function (err, result) {
        assert.equal(null, err);
    });
});

app.listen(port);
