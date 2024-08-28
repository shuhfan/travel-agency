const mongoose = require('mongoose');

const visaSchema = new mongoose.Schema({
    title: { type: String, required: true },
    visaType: { type: String, required: true },
    visaMode: { type: String, required: true },
    validity: { type: String, required: true },
    processingTime: { type: String, required: true },
    price: { type: Number, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    images: { type: [String], required: true }, // Array of image file paths
    createdAt: { type: Date, default: Date.now }
});

const Visa = mongoose.model('Visa', visaSchema);
module.exports = Visa;
