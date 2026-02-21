require("dotenv").config();
const express = require("express"); //importing Express library
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const authMiddleware = require("./middleware/authMiddleware");

const app = express();   //creating backend app

//middleware 
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);


console.log("ENV TEST:", process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("MongoDB Connected successfully"))
.catch((err)=> console.log("MongoDB connection Error",err))
//Test route
app.get('/',(req,res)=>{
console.log("Root route was hit");
res.send("pizza backend running")
})

//protected route 
app.get("/protected", authMiddleware, (req,res)=>{
    res.status(200).json({message : "You accessed a protected route.", user : req.user,})
})

const PORT = process.env.PORT || 5000  
app.listen(PORT , ()=>{   //Starts the server
console.log(`server is running on PORT ${PORT}`);
})
