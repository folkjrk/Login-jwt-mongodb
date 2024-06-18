const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const authRoutes = require('./routes/auth.js');
const protectedRoute = require('./routes/protectedRoute.js')

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3200;

// Middleware
const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:5175', // Adjust the origin as needed
    credentials: true
  }));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use('/auth', authRoutes);
app.use('/', protectedRoute);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        // Start the server
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
        process.exit(1); // Exit the application if MongoDB connection fails
    });

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
});

module.exports = app;
