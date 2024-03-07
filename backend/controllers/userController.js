const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { use } = require("../routes/userRoute");

//Generate Token
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: "1d"
    });
};

//Register User
const registerUser =asyncHandler( async (req, res) => {
    const {name, email, password} = req.body

    //validation
    if(!name || !email || !password){
        res.status(400)
        throw new Error("Please fill in all required fields")
    }

    if(password.length <6){
        res.status(400)
        throw new Error("Password must be up to 6 charactors")
    }

    //check if user email already exists
    const userExists = await User.findOne({email})

    if(userExists){
        res.status(400)
        throw new Error("User email already registered")
    }

    //create new user
    const user = await User.create({
        name,
        email,
        password,
    });

    //Genetare token
    const token = generateToken(user._id);

    //send HTTP-only cookie
    res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400 ), //1 day
        sameSite: "none",
        secure: true
    });

    if(user){
        const {_id, name, email, photo, phone, bio} = user
        res.status(201).json({
            _id, 
            name, 
            email, 
            photo, 
            phone, 
            bio,
            token,
        });
    }else{
        res.status(400)
        throw new Error("Invalid user data");
    }

});

//Login user
const loginUser = asyncHandler(async (req, res) =>{
    const { email, password } = req.body

    //validate request
    if ( !email || !password ){
        res.status(400)
        throw new Error("Please add email and password!!");
    }

    //Check if user exists
    const user = await User.findOne({email})

    //validate request
    if ( !user ){
        res.status(400)
        throw new Error("User not found, Please signup");
    }

    //User exists, check if password is correct
    const passwordIsCorrect = await bcrypt.compare(password, user.password);

    //Genetare token
    const token = generateToken(user._id);

    //send HTTP-only cookie
    res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400 ), //1 day
        sameSite: "none",
        secure: true
    });

    if(user && passwordIsCorrect){
        const {_id, name, email, photo, phone, bio} = user;
        res.status(200).json({
            _id, 
            name, 
            email, 
            photo, 
            phone, 
            bio,
            token,
        });
    }else{
        res.status(400)
        throw new Error("Invalid email or password");
    }
});

//Logout user
const logout = asyncHandler(async (req, res) => {
    res.cookie("token", "", {
        path: "/",
        httpOnly: true,
        expires: new Date(0),
        sameSite: "none",
        secure: true
    });
    return res.status(200).json({ message: "Successfully Logout" })
});

//Get user data
const getUser = asyncHandler (async (req, res) => {
    //res.send("Get user Data")
    const user = await User.findById(req.user._id)

    if(user){
        const {_id, name, email, photo, phone, bio} = user;
        res.status(200).json({
            _id, 
            name, 
            email, 
            photo, 
            phone, 
            bio,
        });
    }else{
        res.status(400);
        throw new Error("User not found");
    }
});

//get login status
const loginStatus = asyncHandler (async(req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json(false)
    }
    //res.send("Login Status");

    //Verify token
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    if (verified) {
        return res.json(true);
    }
    return res.json(false);
});

//Update user
const updateUser = asyncHandler (async(req, res) => {
    //res.send("Update User");

    const user = await User.findById(req.user._id);

    if(user){
        const { name, email, photo, phone, bio } = user;
        user.email = email,
        user.name = req.body.name || name;
        user.phone = req.body.phone || phone;
        user.bio = req.body.bio || bio;
        user.photo = req.body.photo || photo;

        const updateUser = await user.save()
        res.status(200).json({
            _id: updateUser._id, 
            name: updateUser.name, 
            email: updateUser.email, 
            photo: updateUser.photo, 
            phone: updateUser.phone, 
            bio: updateUser.bio,
        })
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

const changePassword = asyncHandler (async(req, res) => {
    
    //res.send("Password Changed");
    const user = await User.findById(req.user._id);
    const { oldPassword, password } = req.body

    if ( !user ) {
        res.status(400);
        throw new Error("User not found, please signup");
    }
    //Validate
    if ( !oldPassword || !password ) {
        res.status(400);
        throw new Error("Please add old and new password");
    }

    //Check if old password matches password in DB
    const passwordIsCorrect = await bcrypt.compare(oldPassword, user.password)

    //Save new password
    if(user&&passwordIsCorrect){
        user.password = password
        await user.save()
        res.status(200).send("Password changed successfull")
    } else {
        res.status(400);
        throw new Error("Old password is incorrect");
    }
});

const forgotPassword = asyncHandler(async(req, res) =>{
    res.send("Forgot Password");
});

module.exports = {
    registerUser,
    loginUser,
    logout,
    getUser,
    loginStatus,
    updateUser,
    changePassword,
    forgotPassword,
};