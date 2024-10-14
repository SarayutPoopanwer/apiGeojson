// models/marker.js
const mongoose = require('mongoose');

// Define the schema for storing GeoJSON data
const markerSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ['FeatureCollection'], // Only allows "FeatureCollection" type
    },
    features: [
        {
            type: {
                type: String,
                required: true,
                enum: ['Feature'], // Only allows "Feature" type
            },
            geometry: {
                type: {
                    type: String,
                    required: true,
                    enum: ['Point'], // Only allows Point geometries
                },
                coordinates: {
                    type: [Number], // Longitude and Latitude
                    required: true,
                },
            },
            properties: {
                type: Object, // Additional properties for the marker
                default: {},
            },
        }
    ]
});

// Export the model
module.exports = mongoose.model('Marker', markerSchema);
