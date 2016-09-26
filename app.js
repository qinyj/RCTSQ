var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var login=require('./routes/login');
var regist=require('./routes/regist');
var user=require('./routes/user');

var session=require('express-session');
var MongoStore=require('connect-mongo')(session);

var db=require('./configs/db');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret:"secret",
  name:'name',
  resave: false,
  saveUninitialized: true,
  cookie:{maxAge:30000},
  store:new MongoStore({
    mongooseConnection:db.dbCon
  })
}));

app.use('/', index);
app.use('/', user);
app.use('/',login);
app.use('/',regist);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
//req.flash
app.use(function(req,res,next){
  console.log("in app.js app.use");
  var err=req.session.error;
  var success=req.session.success;
  var user=req.session.user;
  var mess=req.session.message;
  delete req.session.success;
  delete req.session.error;
  delete req.session.message;
  if(err){
    res.locals.message="*"+err;
  }
  if(mess){
    res.locals.message="*"+mess;
  }
  if(success){
    res.locals.success=success;
  }
  if(user){
    res.locals.user=user.name;
  }
  next();
});


module.exports = app;
