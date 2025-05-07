const mongoose = require('mongoose');
const UserInfo = require('../models/userinfo.model');

// POST /api/userinfo
exports.createUserInfo = async (req, res) => {
    try {
        const { userId, nickname, email, favoriteAnimal, bio } = req.body;
        const avatar = req.file ? req.file.filename : 'default.png';

        if (!userId || !nickname || !email || !favoriteAnimal) {
            return res.status(400).json({ error: 'All required fields must be provided' });
        }

        const exists = await UserInfo.findOne({ userId });
        if (exists) {
            return res.status(409).json({ error: 'UserInfo already exists for this user' });
        }

        const userInfo = new UserInfo({
            userId,
            nickname,
            email,
            avatar,
            favoriteAnimal,
            bio,
        });

        const saved = await userInfo.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(500).json({ error: 'Server error: ' + err.message });
    }
};

// GET /api/userinfo/by-user/:userId
exports.getUserInfoByUserId = async (req, res) => {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ error: 'Invalid user ID format' });
    }

    try {
        const userInfo = await UserInfo.findOne({ userId });
        if (!userInfo) {
            return res.status(404).json({ error: 'UserInfo not found' });
        }

        res.json(userInfo);
    } catch (err) {
        res.status(500).json({ error: 'Server error: ' + err.message });
    }
};

// PUT /api/userinfo/by-user/:userId
exports.updateUserInfoByUserId = async (req, res) => {
    const { userId } = req.params;
    const { nickname, favoriteAnimal, bio } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ error: 'Invalid user ID format' });
    }

    if (!nickname || !favoriteAnimal || !bio) {
        return res.status(400).json({ error: 'All fields (nickname, favoriteAnimal, bio) are required' });
    }

    try {
        const updated = await UserInfo.findOneAndUpdate(
            { userId },
            { nickname, favoriteAnimal, bio },
            { new: true, runValidators: true }
        );

        if (!updated) {
            return res.status(404).json({ error: 'UserInfo not found' });
        }

        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: 'Server error: ' + err.message });
    }
};
