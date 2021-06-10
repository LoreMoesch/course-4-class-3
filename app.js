const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv').config();
const indexRouter = require('./app/src/routes/index');
const usersRouter = require('./app/src/routes/users');
const nasaRouter = require('./app/src/routes/nasa');
const mongoose = require('mongoose');
const mongoConfig = require('./app/config/mongo.config');
const app = express();

// view engine setup
// {"hola": "mundo"} {hola: 'mundo'}
mongoose.connect(mongoConfig.dbUri, mongoConfig.mongooseOptions)
  .then(() => console.log('mongodb connected!'))
  .catch(err => console.log(err));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/nasa', nasaRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
});

module.exports = app;

