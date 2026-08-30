const express = require('express');
const router = express.Router();
const contentController = require('../controllers/contentController');

// Endpoints principales
router.get('/daily', contentController.getDailyContent);
router.get('/saint/today', contentController.getSaintOfToday);
router.get('/curiosity', contentController.getCuriosity);
router.get('/reflection', contentController.getReflection);
router.get('/verse', contentController.getVerse);

module.exports = router;