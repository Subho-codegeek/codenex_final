const express = require('express');
const passport = require('passport');

const router = express.Router();

const qnaController = require('../controllers/qna_controller');

router.post('/post-question', qnaController.postQuestion);
router.get('/get-questions', qnaController.getallQuestions);
router.post('/add-comment', passport.authenticate('jwt', { session: false }), qnaController.addComment);

module.exports = router;