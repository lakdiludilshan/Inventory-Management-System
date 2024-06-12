const asyncHandler = require('express-async-handler')
const User = require('../models/UserModel')

const registerUser = asyncHandler( async (req, res) => {
    const { name, email, password } = req.body;

    //validation
    if(!name || !email || !password) {
        res.status(400);
        throw new Error("Please fill all requierd fields")
    }
    if(password.length < 6) {
        res.status(400);
        throw new Error("Password must be at least 6 characters")
    }

    // check if the user already exists
    const userExits = await User.findOne({ email })
    if(userExits) {
        res.status(400);
        throw new Error("Email has already been registered")
    }

    // create a new user
    const user = await User.create({
        name,
        email,
        password
    })

    if (user) {
        const { _id, name, email, photo, phone } = user
        res.status(201).json({
            _id, name, email, photo, phone
        })
    }
    else {
        res.status(400);
        throw new Error("Invalid user data")
    }
});

module.exports = {
    registerUser,
}