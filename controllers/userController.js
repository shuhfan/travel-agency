const bcrypt = require('bcryptjs');
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

const loadHome = async (req,res,next)=>{
    try {
        res.render('index')
    } catch (error) {
        console.log(error.message);
    }
}
const loadTours = async(req,res,next)=>{
    try {
        const tours = await Tour.find();
        res.render('tours',{ tours })
    } catch (error) {
        console.log(error.message)
    }
}
const loadHotels = async(req,res,next)=>{
    try {
        const hotels = await Hotel.find()
        res.render('hotels',{hotels})
    } catch (error) {
        console.log(error.message)
    }
}
const loadTransports =async(req,res,next)=>{
    try {
        const transports = await Transport.find()
        res.render('transports',{transports})
    } catch (error) {
        console.log(error.message);
        
    }
}
const loadActivities = async(req,res,next)=>{
    try {
        const activities = await Activity.find()
        res.render('activities',{activities})
    } catch (error) {
        console.log(error.message);
        
    }
}
const loadVisa = async(req,res,next)=>{
    try {
        const visas = await Visa.find()
        res.render('visa',{visas})
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
}