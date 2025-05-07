const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

// Register user (important: use `new User` + `.save()`)
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(400).json({ error: 'Имэйл бүртгэлтэй байна' });
        }

        const user = new User({ name, email, password }); // 🔐 triggers pre-save hook
        await user.save();

        res.status(201).json({ message: 'Амжилттай бүртгэгдлээ', user });
    } catch (err) {
        console.error('❌ Register error:', err);
        res.status(500).json({ error: 'Серверийн алдаа' });
    }
};

// Login user
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Имэйл эсвэл нууц үг буруу' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Имэйл эсвэл нууц үг буруу' });
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET || 'secret',
            { expiresIn: '1d' }
        );

        res.status(200).json({
            token,
            user: {
                id: user._id,
                email: user.email,
                nickname: user.name
            }
        });
    } catch (err) {
        console.error('❌ Login error:', err);
        res.status(500).json({ error: 'Серверийн алдаа' });
    }
};
