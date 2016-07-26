var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var groceryRouter = require('.routes/groceries');

var app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

// routes
app.use('/', index);
app.use('/groceries', groceryRouter);

mongoose.connect('mongodb;//localhost:27017/groceries');

var server = app.listen(3000, function(){
  var port = server.address().port;
  console.log("Listening on port", port);
})
