const mongoose = require('mongoose');

const UserInfoSchema = new mongoose.Schema({
    nickname: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 20,
        match: /^[a-zA-Z0-9_]+$/
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /.+\@.+\..+/
    },
    avatar: {
        type: String,
        default: 'default.png'
    },
    favoriteAnimal: {
        type: String,
        enum: ['dog', 'cat', 'panda', 'bear', 'lion', 'rabbit'],
        required: true
    },
    bio: {
        type: String,
        maxlength: 300
    }
}, {
    timestamps: true
});

UserInfoSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.__v;
    return obj;
};

module.exports = mongoose.model('UserInfo', UserInfoSchema);
