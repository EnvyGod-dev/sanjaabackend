const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/user.routes');
const userInfoRoutes = require('./routes/userinfo.routes');
const noteRoutes = require('./routes/note.routes');

require('dotenv').config();

const app = express();
const PORT = 6666;
const MONGO_URI = 'mongodb://127.0.0.1:27017/bd';

app.use(cors());
app.use(express.json());

const startServer = async () => {
    try {
        console.log('🔌 Connecting to MongoDB...');
        await mongoose.connect(MONGO_URI);
        console.log('✅ MongoDB connection established to:', MONGO_URI);

        app.use('/api/users', userRoutes);
        app.use('/api/userinfo', userInfoRoutes);
        app.use('/uploads', express.static('uploads'));
        app.use('/api/notes', noteRoutes);

        app.listen(PORT, () => {
            console.log(`🚀 Server running at http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error('❌ MongoDB connection failed:', err.message);
        process.exit(1);
    }
};

startServer();
