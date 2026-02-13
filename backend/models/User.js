const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type: string,
        required: true
    },
    email:{
        type: string,
        required: true,
        unique: true
    },
    password:{
        type: string,
        required : true
    },
    role : {
        type : string,
        enum :["user","admin"],
        default: "user"
    },
    isVerified:{
        type: Boolean,
        default: false
    }
  },
  {timestamps:true}
);

module.exports = mongoose.model("User",userSchema);