const express = require('express');
const { registerUser, loginUser, logout, getuser, loginStatus, updateUser, changePassword, forgotPassword, resetPassword} = require('../controllers/UserController');
const router = express.Router();
const protect = require('../middleware/AuthMiddleware');

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logout);
router.get("/getuser", protect, getuser);
router.get("/loggedin", loginStatus);
router.patch("/updateuser", protect, updateUser);
router.patch("/changepassword", protect, changePassword);
router.post("/forgotpassword", protect, forgotPassword);
router.put("/resetpassword/:resetToken", protect, resetPassword);


module.exports = router;