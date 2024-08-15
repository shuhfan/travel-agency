const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

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
const loadSignup = async(req,res,next)=>{
    try {
        res.render('signup')
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
const loadDashboard = async(req,res,next)=>{
    try{
        const user = await User.findById(req.session.user_id);
        res.render('dashboard',{ username: user.username })
    } catch (error){
        console.log(error.message);
        
    }
}
const signup = async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    try {
        await newUser.save();
        res.redirect('/login'); // Redirect to login page after successful registration
    } catch (error) {
        console.error(error);
        res.status(500).send('Error registering user');
    }
};
const login = async (req, res) => {
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
        res.redirect('/dashboard'); // Redirect to dashbord page after successful login
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
    logout
}