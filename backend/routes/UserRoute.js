const express = require('express');
const { registerUser, loginUser, logout, getuser} = require('../controllers/UserController');
const router = express.Router();
const protect = require('../middleware/authMiddleware');

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logout);
router.get("/getuser", protect, getuser);


module.exports = router;

