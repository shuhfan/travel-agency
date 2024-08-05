const express = require('express')
const user_router = express()
const session = require('express-session')
const config = require('../config/session')
user_router.use(session({
    secret : config.userSession,
    resave: false,
    saveUninitialized: true,
    cookie : {secure:false}
}))
const auth = require('../middleware/authentication')
user_router.set('view engine','ejs')
user_router.set('views','./views/user')
/* GET users listing. */
user_router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = user_router;
