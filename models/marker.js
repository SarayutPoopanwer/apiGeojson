// models/marker.js

const mongoose = require('mongoose');

// Define schema for GeoJSON data
const markerSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ['FeatureCollection'],
    },
    features: [
        {
            type: {
                type: String,
                required: true,
                enum: ['Feature'],
            },
            geometry: {
                type: {
                    type: String,
                    required: true,
                    enum: ['Point'], // Can expand for LineString, Polygon, etc.
                },
                coordinates: {
                    type: [Number], // [longitude, latitude]
                    required: true,
                },
            },
            properties: {
                type: Object, // Flexible object for additional properties
            },
        }
    ]
});

// Export the Mongoose model
module.exports = mongoose.model('Marker', markerSchema);
