const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const createError = require('http-errors');
const mongoose = require('./config/db');
const dotenv = require('dotenv').config();
const expressLayouts = require('express-ejs-layouts')

const userRouter = require('./routes/userRouter');
const adminRouter = require('./routes/adminRouter');
const app = express();

// Set view engine
app.use(expressLayouts)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');




// Middleware
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  next();
});
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', userRouter);
app.use('/admin',adminRouter);


// Catch 404 and forward to error handler
app.use((req, res, next) => {
  next('Nothing here GO BACK');
});



module.exports = app;
