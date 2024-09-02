const express = require('express')
const admin_router = express()
const upload = require('../multer/multer')
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


admin_router.get('/',auth.isLogout,adminController.loadLogin)
admin_router.get('/dashboard',auth.isLogin,adminController.loadDashboard)
admin_router.get('/tour-upload',auth.isLogin,adminController.loadTourUpload)
admin_router.get('/all-tour',auth.isLogin,adminController.loadAllTours)
admin_router.get('/hotel-upload',auth.isLogin,adminController.loadHotelUpload)
admin_router.get('/all-hotels',auth.isLogin,adminController.loadAllHotels)
admin_router.get('/visa-upload',auth.isLogin,adminController.loadVisaUpload)
admin_router.get('/all-visa',auth.isLogin,adminController.loadAllVisa)
admin_router.get('/activities-upload',auth.isLogin,adminController.loadActivitiesUpload)
admin_router.get('/all-activities',auth.isLogin,adminController.loadAllActivities)
admin_router.get('/transports-upload',adminController.loadTransportUpload)
admin_router.get('/all-transports',adminController.loadAllTransports)
admin_router.get('/booking-list',auth.isLogin,adminController.loadBookingList)
admin_router.get('/customer-list',auth.isLogin,adminController.loadCustomerList)
admin_router.get('/settings',auth.isLogin,adminController.loadSettings)
admin_router.get('/logout',auth.isLogin,adminController.logout)


admin_router.post('/',adminController.login)
admin_router.post('/tour-upload', upload.array('images', 12), adminController.addTour);
admin_router.post('/hotel-upload', upload.array('images', 12), adminController.addHotel);
admin_router.post('/visa-upload', upload.array('images', 12), adminController.addVisa);
admin_router.post('/activity-upload', upload.array('images', 12), adminController.addActivity);
admin_router.post('/transports-upload', upload.array('images', 12), adminController.addTransport);
admin_router.post('/delete-user/:id', auth.isLogin, adminController.deleteUser);



module.exports=admin_router