const express = require("express");
const { authenticateToken } = require("../utilities");

const noteController = require('../controllers/note.controller');

const router = express.Router();

router.post('/add-note', authenticateToken, noteController.addNote);

router.put('/edit-note/:noteId', authenticateToken, noteController.put);

router.get('/get-all-notes', authenticateToken, noteController.get);

router.delete('/delete-note/:noteId', authenticateToken, noteController.delete)

router.put('/update-note-pinned/:noteId', authenticateToken, noteController.updatePin);

module.exports = router;

