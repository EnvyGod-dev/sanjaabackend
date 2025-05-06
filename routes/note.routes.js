const express = require('express');
const router = express.Router();
const controller = require('../controllers/note.controller');

router.post('/', controller.createNote);
router.get('/', controller.getNotesByRef); // ?type=daily&refDate=2025-05-06
router.put('/:id', controller.updateNote);
router.delete('/:id', controller.deleteNote);

module.exports = router;
