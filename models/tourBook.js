const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    paymentId: String,
    quantity: Number,
    startDate: String,
    endDate: String,
    totalAmount: Number
});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking