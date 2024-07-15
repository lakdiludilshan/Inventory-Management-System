const asyncHandler = require('express-async-handler');
const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');


const protect = asyncHandler(async (req, res, next) => {
    try {
        let token = req.cookies.token;
        const tokenBearer = req.headers.authorization;
        console.log(tokenBearer);
        if(tokenBearer && tokenBearer.startsWith('Bearer')) {
            token = tokenBearer.split(' ')[1].trim();
        }
        console.log(token);
        if(!token) {
            res.status(401);
            throw new Error('Not authorized, please login first');
        }

        // verify token
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        // get user details
        const user = await User.findById(verified.id).select('-password');

        if(!user) {
            res.status(401);
            throw new Error('User not found');
        }
        req.user = user;
        next();

    } catch (error) {
        res.status(401);
        throw new Error('Not authorized, please login');
    }


});

module.exports = protect;