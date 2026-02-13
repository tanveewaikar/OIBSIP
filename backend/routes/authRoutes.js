const express = require("express");
const bcrypt = require("bcrypt.js");
const User = require("../models/User")
const router = express.Router();

//Register API
router.post("/register",async (req,res)=>{
try{
    const {name,email,password} = req.body;
// check if user already exists
const existingUser = await User.findOne({email});
if(existingUser){
    return res.status(400).json({message :"User already exists"});
}

// Hashed password
const hashedPassword = await bcrypt.hash(password,10);

// create new user 
const newUser = new User({
    name,
    email,
    password: hashedPassword
});
newUser.save();

res.status(201).json({message:"Registration successfully"});
}
catch(error){
    console.log(error);
    res.status(500).json({message:"Server error"})
}
});

module.exports = router;