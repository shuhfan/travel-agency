const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    discountPrice: { type: Number, required: true },
    duration: { type: Number, required: true },
    maxPeople: { type: Number, required: true },
    destination: { type: String, required: true },
    description: { type: String, required: true },
    images: [{ type: String }], 
}, { timestamps: true });

const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;