// server.js

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Marker = require('./models/marker');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit if connection fails
});

// Route to add a new marker (POST)
app.post('/geojson', async (req, res) => {
    try {
        const geojsonData = req.body;

        // Validate GeoJSON structure
        if (geojsonData.type !== 'FeatureCollection') {
            return res.status(400).json({ message: 'Invalid GeoJSON format. Must be a FeatureCollection' });
        }

        // Save the data in MongoDB
        const newMarker = new Marker(geojsonData);
        await newMarker.save();

        // Respond with success
        res.status(201).json({ message: 'GeoJSON data saved successfully', data: newMarker });
    } catch (error) {
        console.error('Error saving GeoJSON:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Route to get all markers (GET)
app.get('/geojson', async (req, res) => {
    try {
        const markers = await Marker.find(); // Fetch all markers from MongoDB
        res.status(200).json({ markers });
    } catch (error) {
        console.error('Error fetching GeoJSON:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
