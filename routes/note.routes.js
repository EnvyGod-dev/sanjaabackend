const express = require('express');
const router = express.Router();
const controller = require('../controllers/note.controller');

router.post('/', controller.createNote);
router.get('/', controller.getNotesByRef); // ?type=daily&refDate=2025-05-06
router.put('/:id', controller.updateNote);
router.delete('/:id', controller.deleteNote);
router.get('/daily', controller.getAllDailyNotes);
router.get('/calendar', controller.getCalendarNotes); // ✅ new route
router.get('/weekly', controller.getWeeklyNotes);

module.exports = router;
