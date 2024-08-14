const loadHome = async (req,res,next)=>{
    try {
        res.render('index')
    } catch (error) {
        console.log(error.message);
    }
}
const loadTours = async(req,res,next)=>{
    try {
        res.render('tours')
    } catch (error) {
        console.log(error.message)
    }
}
const loadHotels = async(req,res,next)=>{
    try {
        res.render('hotels')
    } catch (error) {
        console.log(error.message)
    }
}
const loadTransports =async(req,res,next)=>{
    try {
        res.render('transports')
    } catch (error) {
        console.log(error.message);
        
    }
}
const loadActivities = async(req,res,next)=>{
    try {
        res.render('activities')
    } catch (error) {
        console.log(error.message);
        
    }
}
const loadVisa = async(req,res,next)=>{
    try {
        res.render('visa')
    } catch (error) {
        console.log(error.message);
        
    }
}
const loadContact = async(req,res,next)=>{
    try {
        res.render('contact')
    } catch (error) {
        console.log(error.message);
        
    }
}
const loadAbout = async(req,res,next)=>{
    try {
        res.render('about')
    } catch (error) {
        console.log(error.message);
        
    }
}
const loadLogin = async(req,res,next)=>{
    try {
        res.render('login')
    } catch (error) {
        console.log(error.message);
        
    }
}
const loadPackageDetails = async(req,res,next)=>{
    try {
        res.render('package-details')
    } catch (error) {
        console.log(error.message);
        
    }
}
const loadHotelDetails = async(req,res,next)=>{
    try {
        res.render('hotel-details')
    } catch (error) {
        console.log(error.message);
        
    }
}
const loadTransportDetails = async(req,res,next)=>{
    try {
        res.render('transport-details')
    } catch (error) {
        console.log(error.message);
        
    }
}
const loadActivitiesDetails = async(req,res,next)=>{
    try {
        res.render('activities-details')
    } catch (error) {
        console.log(error.message);
        
    }
}
const loadVisaDetails = async(req,res,next)=>{
    try{
        res.render('visa-details')
    } catch (error) {
        console.log(error.message);
    }
}
module.exports={loadHome,
    loadTours,
    loadHotels,
    loadTransports,
    loadActivities,
    loadVisa,
    loadContact,
    loadAbout,
    loadLogin,
    loadPackageDetails,
    loadHotelDetails,
    loadTransportDetails,
    loadActivitiesDetails,
    loadVisaDetails,
}