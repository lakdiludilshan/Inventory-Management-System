const express = require('express');
const { registerUser, loginUser, logout, getuser, loginStatus, updateUser} = require('../controllers/UserController');
const router = express.Router();
const protect = require('../middleware/authMiddleware');

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logout);
router.get("/getuser", protect, getuser);
router.get("/loggedin", loginStatus);
router.patch("/updateuser", protect, updateUser);



module.exports = router;

