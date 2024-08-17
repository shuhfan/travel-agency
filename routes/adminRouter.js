const express = require('express')
const admin_router = express()
const session = require('express-session')
const config = require('../config/session')
admin_router.use(session({
    secret:config.adminSession,
    resave:false,
    saveUninitialized:true,
    cookie:{secure:true}
}))
const auth = require('../middleware/adminAuthentication')
const adminController = require('../controllers/adminController')


admin_router.set('view engine','ejs')
admin_router.set('views','./views/admin')
admin_router.set('layout','../layouts/adminlayout')


admin_router.get('/',adminController.loadLogin)
admin_router.get('/dashboard',adminController.loadDashboard)
admin_router.get('/tour-upload',adminController.loadTourUpload)
admin_router.get('/all-tour',adminController.loadAllTours)
admin_router.get('/hotel-upload',adminController.loadHotelUpload)
admin_router.get('/all-hotels',adminController.loadAllHotels)
admin_router.get('/visa-upload',adminController.loadVisaUpload)
admin_router.get('/all-visa',adminController.loadAllVisa)
admin_router.get('/activities-upload',adminController.loadActivitiesUpload)
admin_router.get('/all-activities',adminController.loadAllActivities)
admin_router.get('/transports-upload',adminController.loadTransportUpload)
admin_router.get('/all-transports',adminController.loadAllTransports)
admin_router.get('/booking-list',adminController.loadBookingList)
admin_router.get('/customer-list',adminController.loadCustomerList)
admin_router.get('/settings',adminController.loadSettings)

module.exports=admin_router