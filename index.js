const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');
const https = require('https');
const path = require('path');

require('dotenv').config();

// Routes
const userRoutes = require('./routes/user.routes');
const userInfoRoutes = require('./routes/userinfo.routes');
const noteRoutes = require('./routes/note.routes');

const app = express();
const PORT = 8000;
const MONGO_URI = 'mongodb://127.0.0.1:27017/bd';

// Enable all CORS origins
app.use(cors({ origin: '*' }));

app.use(express.json());

// MongoDB Connection
const startServer = async () => {
    try {
        console.log('🔌 Connecting to MongoDB...');
        await mongoose.connect(MONGO_URI);
        console.log('✅ MongoDB connection established to:', MONGO_URI);

        // Routes
        app.use('/api/users', userRoutes);
        app.use('/api/userinfo', userInfoRoutes);
        app.use('/uploads', express.static('uploads'));
        app.use('/api/notes', noteRoutes);

        // Load SSL key and cert
        const sslOptions = {
            key: fs.readFileSync(path.join(__dirname, 'key.pem')),
            cert: fs.readFileSync(path.join(__dirname, 'cert.pem')),
        };

        // Create HTTPS server
        app.listen(PORT, () => {
            console.log(`🚀 Server running at http://localhost:${PORT}`);
        });

    } catch (err) {
        console.error('❌ MongoDB connection failed:', err.message);
        process.exit(1);
    }
};

startServer();
