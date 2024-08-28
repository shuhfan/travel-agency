const mongoose = require('mongoose');

const transportSchema = new mongoose.Schema({
    transportName: { type: String, required: true },
    type: { type: String, required: true },
    price: { type: Number, required: true },
    discountPrice: { type: Number, required: true },
    duration: { type: String, required: true },
    numberOfPeople: { type: Number, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    images: { type: [String], required: true }, // Store image paths
    createdAt: { type: Date, default: Date.now }
});

const Transport = mongoose.model('Transport', transportSchema);

module.exports = Transport;
