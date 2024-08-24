// models/Booking.js
const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    title: { type: String, required: true },
    roomType: { type: String, required: true },
    price: { type: Number, required: true },
    discountPrice: { type: Number, required: true },
    facilities: { type: String, required: true },
    numberOfPeople: { type: Number, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true }, // URL of the uploaded image
    createdAt: { type: Date, default: Date.now }
});
const hotel = mongoose.model('Hotel', hotelSchema);
module.exports = hotel