const bcrypt = require('bcryptjs');

const Tour = require('../models/tour')
const Hotel = require('../models/hotels')
const Visa = require('../models/visa')
const Activity = require('../models/activity')
const Transport = require('../models/transport')
const User = require('../models/userModel')

const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send('User not found');
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send('Invalid credentials');
        }

        if (!user.isAdmin) {
            return res.status(403).send('Access denied: Not an admin');
        }

        req.session.admin_id = user._id;
        res.redirect('/admin/dashboard'); 
    } catch (error) {
        console.error(error);
        res.status(500).send('Error logging in');
    }
};

const logout = async (req,res,next)=>{
    try {
        req.session.destroy((err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error logging out');
            }
                res.redirect('/');
        });
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
        const hotels = await Hotel.find()
        res.render('allHotels',{hotels})
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
        const visas = await Visa.find()
        res.render('allVisa',{visas})
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
        const activities = await Activity.find()
    res.render('allActivities',{activities})
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
const loadCustomerList = async (req, res, next) => {
    try {
        // Get the search query from the request
        const searchQuery = req.query.search;

        let users;
        if (searchQuery) {
            // Create a search condition array
            const searchConditions = [
                { username: { $regex: searchQuery, $options: 'i' } },  // Case-insensitive search for username
                { email: { $regex: searchQuery, $options: 'i' } },     // Case-insensitive search for email
            ];

            // If the search query is a number, add a search condition for the mobile field
            if (!isNaN(searchQuery)) {
                searchConditions.push({ mobile: searchQuery }); // Exact match for mobile numbers
            }

            // Search users based on the search conditions
            users = await User.find({ $or: searchConditions });
        } else {
            // If no search query, display all users
            users = await User.find();
        }

        // Render the customer list page with the filtered users
        res.render('customerList', { users });
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Error loading customer list');
    }
};

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

    // Handle multiple images
    const images = req.files.map(file => `/uploads/${file.filename}`);

    // Split facilities into an array
    const facilitiesArray = facilities.split(',').map(facility => facility.trim());

    // Create a new hotel instance
    const newHotel = new Hotel({
        title,
        roomType,
        price,
        discountPrice,
        facilities: facilitiesArray,
        numberOfPeople,
        location,
        description,
        images
    });

    try {
        await newHotel.save();
        res.redirect('/admin/hotel-upload'); // Redirect to the admin dashboard or another page
    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding hotel');
    }
};

const addVisa = async (req, res) => {
    try {
        const { title, visaType, visaMode, validity, processingTime, price, location, description } = req.body;
        const images = req.files.map(file => `/uploads/${file.filename}`);

        // Create new Visa document
        const newVisa = new Visa({
            title,
            visaType,
            visaMode,
            validity,
            processingTime,
            price,
            location,
            description,
            images
        });

        await newVisa.save();
        res.redirect('/admin/visa-upload'); 
    } catch (err) {
        console.error(err);
        res.status(500).send('Error uploading visa details');
    }
};

const addActivity =  async (req, res) => {
    try {
        const { activityName, title, price, discountPrice, duration, numberOfPeople, location, description } = req.body;
        const images = req.files.map(file => `/uploads/${file.filename}`);

        const newActivity = new Activity({
            activityName,
            title,
            price,
            discountPrice,
            duration,
            numberOfPeople,
            location,
            description,
            images
        });

        await newActivity.save();

        res.redirect('/admin/activities-upload'); // Redirect after successful submission
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

const addTransport = async (req, res) => {
    const { transportName, type, price, discountPrice, duration, numberOfPeople, location, description } = req.body;
    const images = req.files.map(file => `/uploads/${file.filename}`);

    const newTransport = new Transport({
        transportName,
        type,
        price,
        discountPrice,
        duration,
        numberOfPeople,
        location,
        description,
        images
    });

    try {
        await newTransport.save();
        res.redirect('/admin/transports-upload'); 
    } catch (error) {
        console.error(error);
        res.status(500).send('Error saving transport data');
    }
}
const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        await User.findByIdAndDelete(userId);  // Delete the user from the database
        res.redirect('/admin/customer-list');  // Redirect to the customer list after deletion
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Error deleting user');
    }
};

module.exports = {
    login,
    logout,
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
    addVisa,
    addActivity,
    addTransport,
    deleteUser,
}