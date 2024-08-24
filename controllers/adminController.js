

const Tour = require('../models/tour')
const Hotel = require('../models/hotels')


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
        const tours = await Tour.find();
        res.render('allTour',{ tours })
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
const addTour = async (req, res) => {
    try {
        const { title, price, discountPrice, duration, maxPeople, destination, description } = req.body;

        // Check if files were uploaded
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: 'No files were uploaded.' });
        }

        // Get the uploaded image paths
        const images = req.files.map(file => `/uploads/${file.filename}`);

        // Create a new tour instance
        const newTour = new Tour({
            title,
            price,
            discountPrice,
            duration,
            maxPeople,
            destination,
            description,
            images
        });

        // Save the tour to the database
        await newTour.save();

        // Redirect or send a success response
        res.redirect('/admin/tour-upload'); // Redirect to the admin dashboard or another page
    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding tour package');
    }
};

const addHotel = async (req, res) => {
    const { title, roomType, price, discountPrice, facilities, numberOfPeople, location, description } = req.body;
    const image = req.file ? req.file.path : ''; // Get the uploaded image path

    const newBooking = new Hotel({
        title,
        roomType,
        price,
        discountPrice,
        facilities,
        numberOfPeople,
        location,
        description,
        image
    });

    try {
        await newBooking.save();
        res.redirect('/admin/hotel-upload'); // Redirect to the admin dashboard or another page
    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding tour package');
    }
};


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
    addTour,
    addHotel,
}