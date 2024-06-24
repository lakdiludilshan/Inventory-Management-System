const asyncHandler = require('express-async-handler');
const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const bycrypt = require('bcryptjs');
const crypto = require('crypto');

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: "1d"
    });
};

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

    //Genenrate token
    const token = generateToken(user._id);

    //Send HTTP only cookie
    res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() +1000 * 86400), // 1 day
        sameSite: "none",
        secure: true,
    });

    if (user) {
        const { _id, name, email, photo, phone } = user
        res.status(201).json({
            _id, name, email, photo, phone, token,
        });
    }
    else {
        res.status(400);
        throw new Error("Invalid user data")
    }
});

//Login user

const loginUser = asyncHandler( async (req, res) => {
    
    const { email, password } = req.body;

    console.log(email, password)

    if(!email || !password) {
        res.status(400);
        throw new Error("Please fill all requierd fields")
    }

    //check if the user exists
    const user = await User.findOne({ email })

    console.log(user)

    if(!user) {
        res.status(400);
        throw new Error("Invalid Email")
    }

    //check if the password is correct
    const isPasswordMatch = await bycrypt.compare(password, user.password);

     //Genenrate token
     const token = generateToken(user._id);

     //Send HTTP only cookie
     res.cookie("token", token, {
         path: "/",
         httpOnly: true,
         expires: new Date(Date.now() +1000 * 86400), // 1 day
         sameSite: "none",
         secure: true,
     });

    if (user && isPasswordMatch) {
        const { _id, name, email, photo, phone } = user
        res.status(201).json({
            _id, name, email, photo, phone, token,
        });

    } else {
        res.status(400);
        throw new Error("Invalid user data")
    }
});

//Logout user
const logout = asyncHandler( async (req, res) => {
    res.cookie("token", "", {
        path: "/",
        httpOnly: true,
        expires: new Date(0), 
        sameSite: "none",
        secure: true,
    });
    return res.status(200).json({
        message: "Logged out successfully"
    });
});

//Get user data
const getuser = asyncHandler( async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        const { _id, name, email, photo, phone } = user;
        res.status(200).json({
            _id, name, email, photo, phone,
        });
    }
    else {
        res.status(400);
        throw new Error("User Not Found")
    }
    
});

//Get Login Status
const loginStatus = asyncHandler( async (req, res) => {

    const token = req.cookies.token;
    if(!token) {
        return res.json(false)
    }

    // verify token
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if(verified) {
        return res.json(true)
    }
    else {
        return res.json(false)
    }
}) ;

//update user
const updateUser = asyncHandler( async (req, res) => {

    const user = await User.findById(req.user._id);
    if (user) {
        const { name, email, photo, phone } = user;
    
        user.name = req.body.name || name;
        user.email = email;
        user.phone = req.body.phone || phone;
        user.photo = req.body.photo || photo;

        const updatedUser = await user.save();
        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            phone: updatedUser.phone,
            photo: updatedUser.photo,
        })
    }
    else {
        res.status(400);
        throw new Error("User Not Found")
    }
});

const changePassword = asyncHandler( async (req, res) => {
    const user = await User.findById(req.user._id);
    const { oldPassword, password } = req.body;

    if(!user) {
        res.status(400);
        throw new Error("User Not Found, please Signup again")
    }
    
    if(!oldPassword || !password) {
        res.status(400);
        throw new Error("Please fill all requierd fields")
    }

    //check if the old password is match with the password in db
    const isPasswordMatch = await bycrypt.compare(oldPassword, user.password);

    //save new password 
    if(user && isPasswordMatch) {
        user.password = password;
        await user.save();
        res.status(200).json({
            message: "Password Updated Successfully"
        })
    }
    else {
        res.status(400);
        throw new Error("Invalid Password")
    }
});

const forgotPassword = asyncHandler( async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({email})

    if(!user) {
        res.status(404);
        throw new Error("User does not exist")
    }

    //Generate reset token
    let resetToken = crypto.randomBytes(32).toString("hex") + user._id;

    //Hash the reset token
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    
    //save token to db
    await new Token({
        userId: user._id,
        token: hashedToken,
        createdAt: Date.now(),
        expiresAt: Date.now() + 30 * (60 * 1000), //30 minutes
    }).save();

    //construct reset url
    const resetUrl = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;

    //reset email message
    const message = `
        <h2>Hello ${user.name}</h2>
        <p>Please click the link below to reset your password</p>
        <p>This link will expire in 30 minutes</p>

        <a href=${resetUrl} clicktracking=off>${resetUrl}</a>

        <p>Regards...</p>
        <p>Lakdilus Inventory Soft.</p>
    `;
    res.send("forgot the fu***ng password")

});

module.exports = {
    registerUser,
    loginUser,
    logout,
    getuser,
    loginStatus,
    updateUser,
    changePassword,
    forgotPassword,
};