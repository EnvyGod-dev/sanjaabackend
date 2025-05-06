const mongoose = require('mongoose');

const validTypes = ['daily', 'weekly', 'monthly', 'calendar'];

const NoteSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: validTypes,
        required: true
    },
    refDate: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// ✅ Custom validation before saving
NoteSchema.pre('validate', function (next) {
    const { type, refDate } = this;

    const isValidDate = (str) => /^\d{4}-\d{2}-\d{2}$/.test(str);
    const isValidWeek = (str) => /^\d{4}-W\d{2}$/.test(str);
    const isValidMonth = (str) => /^\d{4}-\d{2}$/.test(str);

    if (type === 'calendar' && !isValidDate(refDate)) {
        return next(new Error('Calendar type requires refDate in YYYY-MM-DD format'));
    }

    if (type === 'daily' && !isValidDate(refDate)) {
        return next(new Error('Daily type requires refDate in YYYY-MM-DD format'));
    }

    if (type === 'weekly' && !isValidWeek(refDate)) {
        return next(new Error('Weekly type requires refDate in YYYY-WW format'));
    }

    if (type === 'monthly' && !isValidMonth(refDate)) {
        return next(new Error('Monthly type requires refDate in YYYY-MM format'));
    }

    next();
});

module.exports = mongoose.model('Note', NoteSchema);
