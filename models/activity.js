// models/Activity.js
const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    activityName: { type: String, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    discountPrice: { type: Number },
    duration: { type: String, required: true },
    numberOfPeople: { type: Number, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    images: { type: [String], required: true }, // Array to store image paths
    createdAt: { type: Date, default: Date.now }
});

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;
