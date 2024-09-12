const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const User = require('../models/userModel');
const Tour = require('../models/tour');
const Hotel = require('../models/hotels')
const Booking = require('../models/tourBook')
const Razorpay = require('razorpay');
const Visa = require('../models/visa');
const Activity = require('../models/activity')
const Transport = require('../models/transport')

const razorpay = new Razorpay({
    key_id: 'YOUR_RAZORPAY_KEY',
    key_secret: 'YOUR_RAZORPAY_SECRET'
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});


const loadHome = async (req,res,next)=>{
    try {
        res.render('index')
    } catch (error) {
        console.log(error.message);
    }
}
const loadTours = async(req,res,next)=>{
    try {
        const searchQuery = req.query.search;

        let tours;
        if (searchQuery) {
            tours = await Tour.find({
                $or: [
                    { title: { $regex: searchQuery, $options: 'i' } },         
                    { destination: { $regex: searchQuery, $options: 'i' } },   
                        
                    // Add more fields if necessary
                ]
            });
        } else {
            tours = await Tour.find();
        }

        // Render the page with the filtered tours
        res.render('tours', { tours });
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Error loading tour list');
    }
}
const loadHotels = async(req,res,next)=>{
    try {
        // Get the search query from the request
        const searchQuery = req.query.search;

        let hotels;
        if (searchQuery) {
            // If there's a search query, filter hotels by title, location, or any other relevant field
            hotels = await Hotel.find({
                $or: [
                    { title: { $regex: searchQuery, $options: 'i' } },        // Case-insensitive search by title
                    { location: { $regex: searchQuery, $options: 'i' } },     // Case-insensitive search by location
                    { description: { $regex: searchQuery, $options: 'i' } }   // Case-insensitive search by description
                    // Add more fields if necessary
                ]
            });
        } else {
            // If no search query, display all hotels
            hotels = await Hotel.find();
        }

        // Render the page with the filtered hotels
        res.render('hotels', { hotels });
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Error loading hotel list');
    }
}
const loadTransports =async(req,res,next)=>{
    try {
        // Get the search query from the request
        const searchQuery = req.query.search;

        let transports;
        if (searchQuery) {
            // If there's a search query, filter transports by type, destination, or any other relevant field
            transports = await Transport.find({
                $or: [
                    { type: { $regex: searchQuery, $options: 'i' } },         // Case-insensitive search by type
                    { destination: { $regex: searchQuery, $options: 'i' } },  // Case-insensitive search by destination
                    { description: { $regex: searchQuery, $options: 'i' } }   // Case-insensitive search by description
                    // Add more fields if necessary
                ]
            });
        } else {
            // If no search query, display all transports
            transports = await Transport.find();
        }

        // Render the page with the filtered transports
        res.render('transports', { transports });
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Error loading transport list');
    }
}
const loadActivities = async(req,res,next)=>{
    try {
        // Get the search query from the request
        const searchQuery = req.query.search;

        let activities;
        if (searchQuery) {
            // If there's a search query, filter activities by name, description, or any other relevant field
            activities = await Activity.find({
                $or: [
                    { title: { $regex: searchQuery, $options: 'i' } },         // Case-insensitive search by activity name
                    { description: { $regex: searchQuery, $options: 'i' } },  // Case-insensitive search by description
                    { location: { $regex: searchQuery, $options: 'i' } }      // Case-insensitive search by location
                    // Add more fields if necessary
                ]
            });
        } else {
            // If no search query, display all activities
            activities = await Activity.find();
        }

        // Render the page with the filtered activities
        res.render('activities', { activities });
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Error loading activity list');
    }
}
const loadVisa = async(req,res,next)=>{
    try {
        // Get the search query from the request
        const searchQuery = req.query.search;

        let visas;
        if (searchQuery) {
            // If there's a search query, filter visas by country, type, or any other relevant field
            visas = await Visa.find({
                $or: [
                    { location: { $regex: searchQuery, $options: 'i' } },   // Case-insensitive search by country
                    { visaType: { $regex: searchQuery, $options: 'i' } },      // Case-insensitive search by visa type
                    { description: { $regex: searchQuery, $options: 'i' } } // Case-insensitive search by description
                    // Add more fields if necessary
                ]
            });
        } else {
            // If no search query, display all visas
            visas = await Visa.find();
        }

        // Render the page with the filtered visas
        res.render('visa', { visas });
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Error loading visa list');
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
const loadSignup = async(req,res,next)=>{
    try {
        res.render('signup')
    } catch (error) {
        console.log(error.message);
        
    }
}
const loadPackageDetails = async(req,res,next)=>{
    try {
        const tour = await Tour.findById(req.params.id);
        const user = await User.findById(req.session.user_id);
        if (!tour) {
            return res.status(404).send('Tour not found');
        }
        res.render('package-details',{tour,user})
        
    } catch (error) {
        console.log(error.message);

        
    }
}
const loadHotelDetails = async(req,res,next)=>{
    try {
        const hotel = await Hotel.findById(req.params.id)
        const user = await User.findById(req.session.user_id);

        res.render('hotel-details',{hotel,user})
    } catch (error) {
        console.log(error.message);
        
    }
}
const loadTransportDetails = async(req,res,next)=>{
    try {
        const transport = await Transport.findById(req.params.id)
        const user = await User.findById(req.session.user_id);
        res.render('transport-details',{transport,user})
    } catch (error) {
        console.log(error.message);
        
    }
}
const loadActivitiesDetails = async(req,res,next)=>{
    try {
        const activity = await Activity.findById(req.params.id)
        const user = await User.findById(req.session.user_id);
        res.render('activities-details',{activity,user})
    } catch (error) {
        console.log(error.message);
        
    }
}
const loadVisaDetails = async(req,res,next)=>{
    try{
        const visa = await Visa.findById(req.params.id)
        const user = await User.findById(req.session.user_id);
        res.render('visa-details',{visa,user})
    } catch (error) {
        console.log(error.message);
    }
}
const loadDashboard = async(req,res,next)=>{
    try{
        const user = await User.findById(req.session.user_id);
        res.render('dashboard',{ username: user.username })
    } catch (error){
        console.log(error.message);
        
    }
}
const signup = async (req, res) => {
    const { username, email, mobile, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send('Email already in use');
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const newUser = new User({ username, email, mobile, password: hashedPassword });
        
        await newUser.save();
        res.redirect('/'); // Redirect to login page after successful registration
    } catch (error) {
        console.error(error);
        res.status(500).send('Error registering user');
    }
};

const login = async (req, res,next) => {
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
        req.session.user_id = user._id;
        next();
        res.redirect('/'); 
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
const createRzpOrder = async(req,res,next)=>{
    const { paymentId, quantity, startDate, endDate, totalAmount } = req.body;

    // Store booking details in the database
    const newBooking = new Booking({
        paymentId,
        quantity,
        startDate,
        endDate,
        totalAmount
    });

    try {
        await newBooking.save();
        res.status(200).json({ message: 'Booking successful!' });
    } catch (error) {
        res.status(500).json({ message: 'Error saving booking: ' + error.message });
    }
}
const loadTermsCondition = async(req,res)=>{
    try {
        res.render('TermsCondition')
    } catch (error) {
        console.log(error.message);
        
    }
}
const loadPrivacyPolicy = async(req,res)=>{
    try {
        res.render('privacyPolicy')
    } catch (error) {
        console.log(error.message);
        
    }
}
const tourContact = async (req, res) => {

    const { name, contactNumber, whatsappNumber, travellingDate, adult, child, tourName, userEmail } = req.body;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: 'New Travel Inquiry',
        text: `Name: ${name}\nContact Number: ${contactNumber}\nWhatsapp Number: ${whatsappNumber}\nTravelling Date: ${travellingDate}\nAdult: ${adult}\nChild: ${child}\nTour Name: ${tourName}\nUser Email: ${userEmail}`
    };

    transporter.sendMail(mailOptions, async(error, info) => {
        if (error) {
            console.log('Error:', error); // Log error details
            res.status(500).send('Internal Server Error');
        } else {
            console.log('Email sent:', info.response);
            res.redirect('/tours');
        }
    });
};

const hotelContact = async (req, res) => {

    const { name, contactNumber, whatsappNumber, checkInDate, checkOutDate,members,hotelName, userEmail } = req.body;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: 'New Hotel Inquiry',
        text: `Name: ${name}\nContact Number: ${contactNumber}\nWhatsapp Number: ${whatsappNumber}\nCheack In Date: ${checkInDate}\nCheack Out Date: ${checkOutDate}\nNo of people: ${members}\nHotel Name: ${hotelName}\nUser Email: ${userEmail}`
    };

    transporter.sendMail(mailOptions, async(error, info) => {
        if (error) {
            console.log('Error:', error); // Log error details
            res.status(500).send('Internal Server Error');
        } else {
            console.log('Email sent:', info.response);
            res.redirect('/hotels');
        }
    });
};

const transportContact = async (req, res) => {

    const { name, contactNumber, whatsappNumber, transportName, transportLocation, userEmail } = req.body;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: 'New Transport Inquiry',
        text: `Name: ${name}\nContact Number: ${contactNumber}\nWhatsapp Number: ${whatsappNumber}\nTransport Name: ${transportName}\nTransport Location: ${transportLocation}\nUser Email: ${userEmail}`
    };

    transporter.sendMail(mailOptions, async(error, info) => {
        if (error) {
            console.log('Error:', error); // Log error details
            res.status(500).send('Internal Server Error');
        } else {
            console.log('Email sent:', info.response);
            res.redirect('/transports');
        }
    });
};

const activityContact = async (req, res) => {

    const { name, contactNumber, whatsappNumber, activityName, activityLocation, userEmail } = req.body;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: 'New Activity Inquiry',
        text: `Name: ${name}\nContact Number: ${contactNumber}\nWhatsapp Number: ${whatsappNumber}\nActivity Name: ${activityName}\nActivity Location: ${activityLocation}\nUser Email: ${userEmail}`
    };

    transporter.sendMail(mailOptions, async(error, info) => {
        if (error) {
            console.log('Error:', error); // Log error details
            res.status(500).send('Internal Server Error');
        } else {
            console.log('Email sent:', info.response);
            res.redirect('/activities');
        }
    });
};

const visaContact = async (req, res) => {

    const { name, contactNumber, whatsappNumber, visaValidity, visaLocation, userEmail } = req.body;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: 'New Visa Inquiry',
        text: `Name: ${name}\nContact Number: ${contactNumber}\nWhatsapp Number: ${whatsappNumber}\nVisa Validity: ${visaValidity}\nVisa Location: ${visaLocation}\nUser Email: ${userEmail}`
    };

    transporter.sendMail(mailOptions, async(error, info) => {
        if (error) {
            console.log('Error:', error); // Log error details
            res.status(500).send('Internal Server Error');
        } else {
            console.log('Email sent:', info.response);
            res.redirect('/visa');
        }
    });
};


module.exports={loadHome,
    loadTours,
    loadHotels,
    loadTransports,
    loadActivities,
    loadVisa,
    loadContact,
    loadAbout,
    loadLogin,
    loadSignup,
    loadPackageDetails,
    loadHotelDetails,
    loadTransportDetails,
    loadActivitiesDetails,
    loadVisaDetails,
    loadDashboard,
    login,
    signup,
    logout,
    createRzpOrder,
    loadTermsCondition,
    loadPrivacyPolicy,
    tourContact,
    hotelContact,
    transportContact,
    activityContact,
    visaContact
}