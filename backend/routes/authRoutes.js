const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const sendEmail = require("../utils/sendEmail");
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

const verificationToken = jwt.sign(
  { id: newUser._id },
  process.env.JWT_SECRET,
  { expiresIn: "1d" }
);

// send email for verification
const verificationLink = `http://localhost:5000/api/auth/verify/${verificationToken}`;
await sendEmail(
  newUser.email,
  "Email Verification",
  `<h2>Verify Your Email</h2>
   <p>Click the link below to verify your email:</p>
   <a href="${verificationLink}">Verify Email</a>`
);
res.status(201).json({message:"Registration successfully"});
}
catch(error){
    console.log(error);
    res.status(500).json({message:"Server error"})
}
});

//login 
router.post("/login", async (req,res)=>{
  try{
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Check if verified
    if (!user.isVerified) {
      return res.status(400).json({ message: "Please verify your email first" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({ message: "Login successful", token });

  } catch (error){
    console.log(error);
    res.status(500).json({ message:"Server error" });
  }
});

//profile route
router.get("/profile",authMiddleware, async (req,res)=>{
    try{
            const user = await User.findById(req.user.id).select("-password");
            res.status(200).json(user);
    }
    catch(error){
            console.log(error);
            res.status(500).json({message : "server error"});
    }
})

//Forgot-password route 

router.post("/forgot-password", async (req, res)=>{
    try{
        const {email} = req.body;
        //check if user exist
        const user = await User.findOne({email})
        if(!user){
            return res.status(404).json({message : "User not found"})
        }
            // Generate reset token 
            const resetToken = jwt.sign(
                {id: user._id},
                process.env.JWT_SECRET,
                {expiresIn : "15m"}
            );
        // create reset link
        const resetLink = `http://localhost:5173/reset-password/${resetToken}`
        await sendEmail(
            user.email,
            "Password reset",
            `Click the link to reset your password : ${resetLink}`
        );
        res.status(200).json({message : "Password reset link sent to email"});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message : "Server error"});
    }
});

//reset-password route 

router.post("/reset-password/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //  Find user
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //  Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Update password
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password reset successful" });

  } catch (error) {
    console.log(error);

    if (error.name === "TokenExpiredError") {
      return res.status(400).json({ message: "Token expired" });
    }

    res.status(500).json({ message: "Server error" });
  }
});

// Verification Route

router.get("/verify/:token", async (req,res)=>{
    try{
        const token = req.params.token;
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if(!user){
            return res.status(404).json({message: "User not found"})
        }
            user.isVerified = true;
            await user.save();
        
        res.status(200).json({message: "Email verified successfully"});
    }
    catch(error){
        res.status(400).json({message: "Invalid or expired token"})
    }
})

module.exports = router;