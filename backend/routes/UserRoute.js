const express = require('express');
const { registerUser, loginUser, logout, getuser, loginStatus} = require('../controllers/UserController');
const router = express.Router();
const protect = require('../middleware/authMiddleware');

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logout);
router.get("/getuser", protect, getuser);
router.get("/loggedin", loginStatus);



module.exports = router;

