// models/Booking.js
const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    title: { type: String, required: true },
    roomType: { type: String, required: true },
    price: { type: Number, required: true },
    discountPrice: { type: Number, required: true },
    facilities: { type: Array, required: true },
    numberOfPeople: { type: Number, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    images: { type: [String], required: true }, // URL of the uploaded image
    createdAt: { type: Date, default: Date.now }
});
const Hotel = mongoose.model('Hotel', hotelSchema);
module.exports = Hotel