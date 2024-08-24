// db.js
const mongoose = require('mongoose');
const env = require('dotenv').config();

const dbURI = process.env.DB_URL;

// Set up a database connection
mongoose.connect(dbURI);

// Connection events
mongoose.connection.on('connected', () => {
    console.log('MongoDB connected to ' + dbURI);
});

mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error: ' + err);
});

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

module.exports = mongoose;
