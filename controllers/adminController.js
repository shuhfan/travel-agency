const loadLogin = async(req,res,next)=>{
    try {
        res.render('login')
    } catch (error) {
        console.log(error.message);
        
    }
}
const loadDashboard = async(req,res,next)=>{
    try {
        res.render('dashboard')
    } catch (error) {
        console.log(error.message);
        
    }
}
const loadTourUpload = async(req,res,next)=>{
    try {
        res.render('tourUpload')
    } catch (error) {
        console.log(error.message);
        
    }
}
const loadAllTours = async (req,res,next)=>{
    try {
        res.render('allTour')
    } catch (error) {
        console.log(error.message);
        
    }
}
const loadHotelUpload = async(req,res,next)=>{
    try {
        res.render('hotelUpload')
    } catch (error) {
        console.log(error.message);
        
    }
}
const loadAllHotels = async(req,res,next)=>{
    try {
        res.render('allHotels')
    } catch (error) {
        console.log(error.message);
        
    }
}
const loadVisaUpload = async(req,res,next)=>{
    try {
        res.render('visaUpload')
    } catch (error) {
        console.log(error.message);
        
    }
}
const loadAllVisa = async(req,res,next)=>{
    try {
        res.render('allVisa')
    } catch (error) {
        console.log(error.message);
        
    }
}
const loadActivitiesUpload = async(req,res,next)=>{
    try {
        res.render('activitiesUpload')
    } catch (error) {
        console.log(error.message);
        
    }
}
const loadAllActivities = async(req,res,next)=>{
    try {
        res.render('allActivities')
    } catch (error) {
        console.log(error.message);
        
    }
}
const loadTransportUpload = async(req,res,next)=>{
    try {
        res.render('transportUpload')
    } catch (error) {
        console.log(error.message);
        
    }
}
const loadAllTransports = async(req,res,next)=>{
    try {
        res.render('allTransport')
    } catch (error) {
        console.log(error.message);
        
    }
}
const loadBookingList = async(req,res,next)=>{
    try {
        res.render('bookingList')
    } catch (error) {
        console.log(error.message);
        
    }
}
const loadCustomerList = async(req,res,next)=>{
    try {
        res.render('customerList')
    } catch (error) {
        console.log(error.message);
        
    }
}
const loadSettings = async(req,res,next)=>{
    try {
        res.render('settings')
    } catch (error) {
        console.log(error.message);
        
    }
}
module.exports = {
    loadLogin,
    loadDashboard,
    loadTourUpload,
    loadAllTours,
    loadHotelUpload,
    loadAllHotels,
    loadVisaUpload,
    loadAllVisa,
    loadActivitiesUpload,
    loadAllActivities,
    loadTransportUpload,
    loadAllTransports,
    loadBookingList,
    loadCustomerList,
    loadSettings,
}