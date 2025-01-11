const express = require("express");
const { authenticateToken } = require("../utilities");

const authController = require('../controllers/auth.controller');

const router = express.Router();
// Create User Account
router.post("/create-account", authController.register);

router.post('/login', authController.login);

router.get('/get-user', authenticateToken, authController.get);

module.exports = router;