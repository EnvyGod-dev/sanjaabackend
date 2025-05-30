const Note = require('../models/note.model');

// CREATE
exports.createNote = async (req, res) => {
    try {
        const { type, refDate, content } = req.body;
        const note = new Note({ type, refDate, content });
        const saved = await note.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// READ
exports.getNotesByRef = async (req, res) => {
    try {
        const { type, refDate } = req.query;
        const notes = await Note.find({ type, refDate });
        res.json(notes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// GET /api/notes?refDate=2025-05-07
exports.getAllDailyNotes = async (req, res) => {
    try {
        const notes = await Note.find({ type: 'daily' }).sort({ createdAt: -1 });
        res.status(200).json(notes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// UPDATE
exports.updateNote = async (req, res) => {
    try {
        const updated = await Note.findByIdAndUpdate(
            req.params.id,
            { content: req.body.content },
            { new: true }
        );
        if (!updated) return res.status(404).json({ error: 'Note not found' });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// DELETE
exports.deleteNote = async (req, res) => {
    try {
        const deleted = await Note.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ error: 'Note not found' });
        res.json({ message: 'Note deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getCalendarNotes = async (req, res) => {
    try {
        const { refDate } = req.query;

        const query = { type: 'calendar' };
        if (refDate) {
            query.refDate = refDate;
        }

        const notes = await Note.find(query).sort({ refDate: 1 });
        res.json(notes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getWeeklyNotes = async (req, res) => {
    try {
        const { refDate } = req.query;

        const query = { type: 'weekly' };
        if (refDate) {
            query.refDate = refDate;
        }

        const notes = await Note.find(query).sort({ refDate: -1 });
        res.json(notes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
