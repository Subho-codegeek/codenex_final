const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// router.get('/test', userController.testUser);
router.post('/',userController.registerUser);
router.post('/auth', userController.authUser);
router.post('/logout', userController.logoutUser);
router.get('/getCurrentUser', authMiddleware.protect, userController.getUserProfile);

module.exports = router;
