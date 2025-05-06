const UserInfo = require('../models/userinfo.model');

exports.createUserInfo = async (req, res) => {
    try {
        const { nickname, email, favoriteAnimal, bio } = req.body;
        const avatar = req.file ? req.file.filename : 'default.png';

        if (!nickname || !email || !favoriteAnimal) {
            return res.status(400).json({ error: 'Nickname, email, and favorite animal are required' });
        }

        const exists = await UserInfo.findOne({ $or: [{ email }, { nickname }] });
        if (exists) {
            return res.status(409).json({ error: 'User with this email or nickname already exists' });
        }

        const newUser = new UserInfo({ nickname, email, avatar, favoriteAnimal, bio });
        const saved = await newUser.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await UserInfo.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getUserByNickname = async (req, res) => {
    try {
        const user = await UserInfo.findOne({ nickname: req.params.nickname });
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
