const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user.model');

// POST /api/users
exports.createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: hashedPassword
        });

        const saved = await user.save();

        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// GET /api/users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find({}, '-password');
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// POST /api/users/login
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ error: "Имэйл эсвэл нууц үг буруу" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || "secret", {
            expiresIn: "1d"
        });

        res.status(200).json({
            token,
            user: {
                id: user._id, // ✅ add this line
                email: user.email,
                nickname: user.name || user.nickname // adjust if needed
            }
        });
    } catch (err) {
        res.status(500).json({ error: "Серверийн алдаа" });
    }
};
