const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const MONGO_URI = 'mongodb://127.0.0.1:27017/bd';
        console.log('✅ Connected to MongoDB database: bd');
    } catch (error) {
        console.error('❌ MongoDB connection error:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
