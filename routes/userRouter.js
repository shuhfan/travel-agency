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
const userController = require('../controllers/userController')
user_router.set('view engine','ejs')
user_router.set('views','./views/user')


user_router.get('/',auth.isLogout,userController.loadHome)
user_router.get('/tours',userController.loadTours)
user_router.get('/hotels',userController.loadHotels)
user_router.get('/transports',userController.loadTransports)
user_router.get('/activities',userController.loadActivities)
user_router.get('/visa',userController.loadVisa)
user_router.get('/contact',userController.loadContact)
user_router.get('/about',userController.loadAbout)
user_router.get('/login',auth.isLogout,userController.loadLogin)
user_router.get('/signup',userController.loadSignup)
user_router.get('/package-details',userController.loadPackageDetails)
user_router.get('/hotel-details',userController.loadHotelDetails)
user_router.get('/transport-details',userController.loadTransportDetails)
user_router.get('/activities-details',userController.loadActivitiesDetails)
user_router.get('/visa-details',userController.loadVisaDetails)
user_router.get('/dashboard',auth.isLogin,userController.loadDashboard)
user_router.get('/logout',auth.isLogin,userController.logout)

user_router.post('/signup',userController.signup)
user_router.post('/login',userController.login)


module.exports = user_router