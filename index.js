// server.js

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Marker = require('./models/marker');

// Load environment variables
dotenv.config();

// Initialize the Express app
const app = express();

// Middleware to parse JSON
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit if there's a connection error
});

// Define the POST route to handle incoming GeoJSON data
app.post('/geojson', async (req, res) => {
    try {
        const markerData = req.body;

        // Validate that the incoming data has a 'FeatureCollection' structure
        if (markerData.type !== 'FeatureCollection') {
            return res.status(400).json({ message: 'Invalid GeoJSON format. Must be a FeatureCollection' });
        }

        // Save the marker data in the database
        const marker = new Marker(markerData);
        await marker.save();

        // Send a success response
        res.status(201).json({ message: 'Marker data saved successfully' });
    } catch (error) {
        console.error('Error saving marker data:', error);
        res.status(500).json({ message: 'Failed to save marker data' });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
