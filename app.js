const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const users = require('./routes/users');
const articles = require('./routes/articles');
const app = express();
const process = require('process');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.set('json spaces', 2);

const monk = require('monk');
//const db = monk('localhost:27017/test');
const db = monk(process.env.MY_DB_ENDPOINT);


// Make our db accessible to our router
app.use(function(req,res,next){
  req.db = db;
  next();
});

app.use('/users', users);
app.use('/articles', articles);

module.exports = app;
