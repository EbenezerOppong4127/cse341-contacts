require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const swaggerSetup = require('./swagger'); // Import Swagger setup
const contactRoutes = require('./routes/contacts');

// ✅ Initialize Express App
const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB
connectDB();

// ✅ Swagger Documentation
swaggerSetup(app);

// ✅ Routes
app.use('/contacts', contactRoutes);

// ✅ Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
