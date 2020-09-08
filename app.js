var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const config = require('./config');

var dishes = require("./routes/dishroutes");
var leaders = require("./routes/leadersrouter");
var promotions = require("./routes/promotionsrouter");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const session = require('express-session');
var filestore = require('session-file-store')(session);

var app = express();

const url = config.url;
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser('12345-67890-65987-78546'));
/* app.use(session({
  name:'session-id',
  secret:'12345-67890-65987-78546',
  saveUninitialized:false,
  resave:false,
  store:new filestore()
  })); */
app.use(passport.initialize());
//app.use(passport.session());
app.use('/', indexRouter);
app.use('/users', usersRouter);
/* function auth(req, res, next) {
  if (!req.user) {
    var error = new Error('You are not authenfied');
    res.setHeader('www-Authenticate', 'Basic');
    error.status = 401;
    return next(error);
  }
  else {
    next();
  }
}
app.use(auth); */
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', dishes);
app.use('/', leaders);
app.use('/', promotions);
app.use('/', indexRouter);

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then((db) => {
  console.log("connected to server");
}).catch((err) => console.log(err));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
  console.log(err);
});



module.exports = app;
